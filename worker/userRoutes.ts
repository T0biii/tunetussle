import { Hono } from "hono";
import { Env } from './core-utils';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
// This function is a placeholder for a real implementation.
// In a real app, you'd get these from your Cloudflare Worker's secrets.
const getSecrets = (c: any) => {
  return {
    SPOTIFY_CLIENT_ID: c.env.SPOTIFY_CLIENT_ID || 'YOUR_SPOTIFY_CLIENT_ID',
    SPOTIFY_CLIENT_SECRET: c.env.SPOTIFY_CLIENT_SECRET || 'YOUR_SPOTIFY_CLIENT_SECRET',
    APP_URL: c.env.APP_URL || 'http://localhost:3000',
  }
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  const spotify = new Hono<{ Bindings: Env }>();
  spotify.get('/login', (c) => {
    const { SPOTIFY_CLIENT_ID, APP_URL } = getSecrets(c);
    const scopes = 'user-read-private user-read-email';
    const redirectUri = `${APP_URL}/api/spotify/callback`;
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('scope', scopes);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    return c.redirect(authUrl.toString());
  });
  spotify.get('/callback', async (c) => {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, APP_URL } = getSecrets(c);
    const code = c.req.query('code');
    const redirectUri = `${APP_URL}/api/spotify/callback`;
    if (!code) {
      return c.json({ error: 'Authorization code not found' }, 400);
    }
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error("Spotify token exchange failed:", errorBody);
      return c.redirect(`${APP_URL}?error=auth_failed`);
    }
    const tokenData = await tokenResponse.json<{ access_token: string }>();
    setCookie(c, 'spotify_access_token', tokenData.access_token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 3600, // 1 hour
    });
    return c.redirect(APP_URL);
  });
  spotify.get('/me', async (c) => {
    const accessToken = getCookie(c, 'spotify_access_token');
    if (!accessToken) {
      return c.json({ user: null });
    }
    const userResponse = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!userResponse.ok) {
      deleteCookie(c, 'spotify_access_token', { path: '/' });
      return c.json({ user: null });
    }
    const userData = await userResponse.json();
    return c.json({ user: userData });
  });
  spotify.post('/logout', (c) => {
    deleteCookie(c, 'spotify_access_token', { path: '/' });
    return c.json({ success: true });
  });
  spotify.get('/search', async (c) => {
    const accessToken = getCookie(c, 'spotify_access_token');
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const query = c.req.query('q');
    if (!query) {
      return c.json({ albums: { items: [] } });
    }
    const searchUrl = new URL('https://api.spotify.com/v1/search');
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('type', 'album');
    searchUrl.searchParams.append('limit', '12');
    const searchResponse = await fetch(searchUrl.toString(), {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!searchResponse.ok) {
      return c.json({ error: 'Failed to search Spotify' }, 500);
    }
    const searchData = await searchResponse.json();
    return c.json(searchData);
  });
  app.route('/api/spotify', spotify);
}