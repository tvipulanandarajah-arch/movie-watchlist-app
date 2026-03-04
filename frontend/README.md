# Movie Watchlist App

A React-based movie watchlist application built with TypeScript and Tailwind CSS.

## Features

- 🔍 Search movies using OMDb API
- 📋 Add movies to personal watchlist
- ⭐ Rate movies (1-5 stars)
- ✅ Mark movies as watched/unwatched
- 🎬 Filter by movies/series
- 📅 Sort by year
- 💾 Local storage persistence
- 🔗 Direct IMDB links

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- OMDb API

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file with your OMDb API key: VITE_OMDB_API_KEY=your_api_key
4. Run the app: `npm run dev`

## Folder Structure
src/
├── components/
│ ├── atoms/ # Basic UI elements
│ ├── molecules/ # Composite components
│ ├── organisms/ # Complex components
│ └── templates/ # Page layouts
├── pages/ # Route pages
├── hooks/ # Custom React hooks
├── services/ # API services
├── types/ # TypeScript types
└── constants/ # App constants

## License

MIT