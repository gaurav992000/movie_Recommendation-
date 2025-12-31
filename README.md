Tech Used

**Frontend:**
- React + TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Node.js + Fastify
- PostgreSQL(neon db)
- Google Gemini API

## Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Gemini API key ([get it here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repo
```bash
git clone <your-repo-url>
cd elucid
```

2. Backend setup
```bash
cd Backend
npm install
```

Create `Backend/.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/movie_db
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

3. Frontend setup
```bash
cd ../frontend
npm install
```

4. Run

Terminal 1 (Backend):
```bash
cd Backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## API Endpoints

- `GET /health` - Check if server is running
- `POST /api/movies/recommend` - Get movie recommendations
- `GET /api/recommendations` - View all saved recommendations

## Project Structure

```
elucid/
├── Backend/          # API server
│   └── src/
│       ├── config/   # Database & API setup
│       ├── routes/   # API endpoints
│       ├── services/ # Business logic
│       └── types/    # TypeScript types
└── frontend/         # React app
    └── src/
        └── component/ # UI components
```
