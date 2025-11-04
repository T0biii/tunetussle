# TuneTussle

A retro-themed, drag-and-drop song ranking application to sort your favorite tunes in style.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/T0biii/tunetussle)

## About The Project

TuneTussle is a visually striking, retro-themed web application where users can rank their favorite songs. The interface is designed to evoke a sense of 90s nostalgia, featuring pixel art aesthetics, neon colors, and glitch effects. The core functionality allows users to see a predefined list of songs and reorder them using intuitive drag-and-drop controls.

The entire experience is contained within a single, dynamic view, making it fast, engaging, and simple to use. The application state, which is the ordered list of songs, is managed on the client-side using Zustand, ensuring a snappy and responsive user experience without backend dependencies for the core feature.

### Key Features

*   **Retro 90s Aesthetic:** A unique UI with pixel art, neon glows, and CRT scanline effects.
*   **Drag & Drop Sorting:** Intuitively reorder songs to create your perfect ranking.
*   **Single-Page Application:** A fast, fluid, and seamless user experience.
*   **Client-Side State:** Powered by Zustand for instant state updates with no backend lag.
*   **Responsive Design:** Looks great on desktop, tablet, and mobile devices.
*   **Accessible:** Keyboard navigation support for sorting.

## Technology Stack

This project is built with a modern, high-performance tech stack:

*   **Framework:** [React](https://react.dev/) (with Vite)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
*   **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/tunetussle_retro_song_sorter.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd tunetussle_retro_song_sorter
    ```
3.  Install dependencies:
    ```sh
    bun install
    ```

## Development

To run the application in development mode with hot-reloading:

```sh
bun dev
```

This will start the Vite development server, typically on `http://localhost:3000`.

## Building for Production

To create a production-ready build of the application:

```sh
bun build
```

This command bundles the application into the `dist` directory, optimized for deployment.

## Deployment

This project is configured for easy deployment to Cloudflare Pages/Workers.

### Deploy with a single click

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/T0biii/tunetussle)

### Manual Deployment via Wrangler

1.  Ensure you have [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.
2.  Run the deployment script:
    ```sh
    bun deploy
    ```

This will build the application and deploy it using the configuration in `wrangler.toml`.

## License

Distributed under the MIT License. See `LICENSE` for more information.