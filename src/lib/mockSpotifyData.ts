export interface Track {
  id: string;
  title: string;
  artist: string;
}
export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
}
const mockTracks: Record<string, Track[]> = {
  'album-1': [
    { id: '1-1', title: "Smells Like Teen Spirit", artist: "Nirvana" },
    { id: '1-2', title: "In Bloom", artist: "Nirvana" },
    { id: '1-3', title: "Come as You Are", artist: "Nirvana" },
    { id: '1-4', title: "Breed", artist: "Nirvana" },
    { id: '1-5', title: "Lithium", artist: "Nirvana" },
    { id: '1-6', title: "Polly", artist: "Nirvana" },
    { id: '1-7', title: "Territorial Pissings", artist: "Nirvana" },
    { id: '1-8', title: "Drain You", artist: "Nirvana" },
  ],
  'album-2': [
    { id: '2-1', title: "Wanna Be Startin' Somethin'", artist: "Michael Jackson" },
    { id: '2-2', title: "Baby Be Mine", artist: "Michael Jackson" },
    { id: '2-3', title: "The Girl Is Mine", artist: "Michael Jackson" },
    { id: '2-4', title: "Thriller", artist: "Michael Jackson" },
    { id: '2-5', title: "Beat It", artist: "Michael Jackson" },
    { id: '2-6', title: "Billie Jean", artist: "Michael Jackson" },
    { id: '2-7', title: "Human Nature", artist: "Michael Jackson" },
    { id: '2-8', title: "P.Y.T. (Pretty Young Thing)", artist: "Michael Jackson" },
  ],
  'album-3': [
    { id: '3-1', title: "Death on Two Legs", artist: "Queen" },
    { id: '3-2', title: "Lazing on a Sunday Afternoon", artist: "Queen" },
    { id: '3-3', title: "I'm in Love with My Car", artist: "Queen" },
    { id: '3-4', title: "You're My Best Friend", artist: "Queen" },
    { id: '3-5', title: "'39", artist: "Queen" },
    { id: '3-6', title: "Sweet Lady", artist: "Queen" },
    { id: '3-7', title: "Bohemian Rhapsody", artist: "Queen" },
    { id: '3-8', title: "God Save the Queen", artist: "Queen" },
  ],
  'album-4': [
    { id: '4-1', title: "Come Together", artist: "The Beatles" },
    { id: '4-2', title: "Something", artist: "The Beatles" },
    { id: '4-3', title: "Maxwell's Silver Hammer", artist: "The Beatles" },
    { id: '4-4', title: "Oh! Darling", artist: "The Beatles" },
    { id: '4-5', title: "Octopus's Garden", artist: "The Beatles" },
    { id: '4-6', title: "Here Comes the Sun", artist: "The Beatles" },
    { id: '4-7', title: "Because", artist: "The Beatles" },
    { id: '4-8', title: "Golden Slumbers", artist: "The Beatles" },
  ],
  'album-5': [
    { id: '5-1', title: "Hotel California", artist: "Eagles" },
    { id: '5-2', title: "New Kid in Town", artist: "Eagles" },
    { id: '5-3', title: "Life in the Fast Lane", artist: "Eagles" },
    { id: '5-4', title: "Wasted Time", artist: "Eagles" },
    { id: '5-5', title: "Victim of Love", artist: "Eagles" },
    { id: '5-6', title: "Pretty Maids All in a Row", artist: "Eagles" },
    { id: '5-7', title: "Try and Love Again", artist: "Eagles" },
    { id: '5-8', title: "The Last Resort", artist: "Eagles" },
  ],
  'album-6': [
    { id: '6-1', title: "Welcome to the Jungle", artist: "Guns N' Roses" },
    { id: '6-2', title: "It's So Easy", artist: "Guns N' Roses" },
    { id: '6-3', title: "Nightrain", artist: "Guns N' Roses" },
    { id: '6-4', title: "Paradise City", artist: "Guns N' Roses" },
    { id: '6-5', title: "Mr. Brownstone", artist: "Guns N' Roses" },
    { id: '6-6', title: "Sweet Child o' Mine", artist: "Guns N' Roses" },
    { id: '6-7', title: "My Michelle", artist: "Guns N' Roses" },
    { id: '6-8', title: "Rocket Queen", artist: "Guns N' Roses" },
  ],
  'album-7': [
    { id: '7-1', title: "Speak to Me / Breathe", artist: "Pink Floyd" },
    { id: '7-2', title: "On the Run", artist: "Pink Floyd" },
    { id: '7-3', title: "Time", artist: "Pink Floyd" },
    { id: '7-4', title: "The Great Gig in the Sky", artist: "Pink Floyd" },
    { id: '7-5', title: "Money", artist: "Pink Floyd" },
    { id: '7-6', title: "Us and Them", artist: "Pink Floyd" },
    { id: '7-7', title: "Any Colour You Like", artist: "Pink Floyd" },
    { id: '7-8', title: "Brain Damage / Eclipse", artist: "Pink Floyd" },
  ],
  'album-8': [
    { id: '8-1', title: "Second Hand News", artist: "Fleetwood Mac" },
    { id: '8-2', title: "Dreams", artist: "Fleetwood Mac" },
    { id: '8-3', title: "Never Going Back Again", artist: "Fleetwood Mac" },
    { id: '8-4', title: "Don't Stop", artist: "Fleetwood Mac" },
    { id: '8-5', title: "Go Your Own Way", artist: "Fleetwood Mac" },
    { id: '8-6', title: "Songbird", artist: "Fleetwood Mac" },
    { id: '8-7', title: "The Chain", artist: "Fleetwood Mac" },
    { id: '8-8', title: "You Make Loving Fun", artist: "Fleetwood Mac" },
  ],
  'album-9': [
    { id: '9-1', title: "Black Dog", artist: "Led Zeppelin" },
    { id: '9-2', title: "Rock and Roll", artist: "Led Zeppelin" },
    { id: '9-3', title: "The Battle of Evermore", artist: "Led Zeppelin" },
    { id: '9-4', title: "Stairway to Heaven", artist: "Led Zeppelin" },
    { id: '9-5', title: "Misty Mountain Hop", artist: "Led Zeppelin" },
    { id: '9-6', title: "Four Sticks", artist: "Led Zeppelin" },
    { id: '9-7', title: "Going to California", artist: "Led Zeppelin" },
    { id: '9-8', title: "When the Levee Breaks", artist: "Led Zeppelin" },
  ],
  'album-10': [
    { id: '10-1', title: "London Calling", artist: "The Clash" },
    { id: '10-2', title: "Brand New Cadillac", artist: "The Clash" },
    { id: '10-3', title: "Jimmy Jazz", artist: "The Clash" },
    { id: '10-4', title: "Hateful", artist: "The Clash" },
    { id: '10-5', title: "Rudie Can't Fail", artist: "The Clash" },
    { id: '10-6', title: "Spanish Bombs", artist: "The Clash" },
    { id: '10-7', title: "The Guns of Brixton", artist: "The Clash" },
    { id: '10-8', title: "Train in Vain", artist: "The Clash" },
  ],
  'album-11': [
    { id: '11-1', title: "Is This Love", artist: "Bob Marley & The Wailers" },
    { id: '11-2', title: "No Woman, No Cry", artist: "Bob Marley & The Wailers" },
    { id: '11-3', title: "Could You Be Loved", artist: "Bob Marley & The Wailers" },
    { id: '11-4', title: "Three Little Birds", artist: "Bob Marley & The Wailers" },
    { id: '11-5', title: "Buffalo Soldier", artist: "Bob Marley & The Wailers" },
    { id: '11-6', title: "Get Up, Stand Up", artist: "Bob Marley & The Wailers" },
    { id: '11-7', title: "Stir It Up", artist: "Bob Marley & The Wailers" },
    { id: '11-8', title: "One Love / People Get Ready", artist: "Bob Marley & The Wailers" },
  ],
  'album-12': [
    { id: '12-1', title: "Give Life Back to Music", artist: "Daft Punk" },
    { id: '12-2', title: "The Game of Love", artist: "Daft Punk" },
    { id: '12-3', title: "Giorgio by Moroder", artist: "Daft Punk" },
    { id: '12-4', title: "Instant Crush", artist: "Daft Punk" },
    { id: '12-5', title: "Lose Yourself to Dance", artist: "Daft Punk" },
    { id: '12-6', title: "Get Lucky", artist: "Daft Punk" },
    { id: '12-7', title: "Doin' it Right", artist: "Daft Punk" },
    { id: '12-8', title: "Contact", artist: "Daft Punk" },
  ],
  // This is a fallback for albums searched via API, since we don't fetch real tracks yet.
  // We'll use a generic set of tracks for any selected album.
  'default': [
    { id: 'd-1', title: "Track 1", artist: "Various Artists" },
    { id: 'd-2', title: "Track 2", artist: "Various Artists" },
    { id: 'd-3', title: "Track 3", artist: "Various Artists" },
    { id: 'd-4', title: "Track 4", artist: "Various Artists" },
    { id: 'd-5', title: "Track 5", artist: "Various Artists" },
    { id: 'd-6', title: "Track 6", artist: "Various Artists" },
    { id: 'd-7', title: "Track 7", artist: "Various Artists" },
    { id: 'd-8', title: "Track 8", artist: "Various Artists" },
  ]
};
export const getAlbumTracks = (albumId: string): Track[] => {
  // Use specific mock tracks if available, otherwise use a default set for API-fetched albums.
  return mockTracks[albumId] || mockTracks['default'];
};