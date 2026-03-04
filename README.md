# 🎬 MovieMark

A full-stack movie watchlist application built with **React + TypeScript** (frontend) and **Node.js + Express + MongoDB** (backend). Users can search for movies, manage their personal watchlist, track watched films, and rate them — all with secure JWT-based authentication.

---

## 📁 Project Structure

```
movie-watchlist-app/
├── frontend/          # React + TypeScript + Vite client
├── backend/           # Node.js + Express + TypeScript API
└── README.md
```

---

## 🚀 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Context API | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| TypeScript | Type safety |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Access token authentication |
| bcryptjs | Password hashing |
| cookie-parser | httpOnly cookie support |
| swagger-ui-express | API documentation |
| dotenv | Environment configuration |
| CORS | Cross-origin request handling |

---

## ✨ Features

### Authentication
- ✅ User registration with name, email, password
- ✅ Secure login with JWT access tokens (15 min expiry)
- ✅ Refresh tokens stored as httpOnly cookies (7 day expiry)
- ✅ Auto token refresh — no forced re-login
- ✅ Secure logout — clears token from DB and cookie
- ✅ Protected routes — unauthenticated users redirected to `/login`
- ✅ Password hashing with bcrypt (salt rounds: 10)

### Movie Watchlist
- ✅ Search movies via OMDB API
- ✅ Add movies to personal watchlist
- ✅ Remove movies from watchlist
- ✅ Mark movies as watched / unwatched
- ✅ Rate movies (0–10 scale) with star rating UI
- ✅ Filter watchlist by status (all / watched / unwatched)
- ✅ Sort watchlist by title, rating, or date added
- ✅ Each user has a completely isolated watchlist

### Movie Diary
- ✅ Track watched movies with watch dates
- ✅ Filter diary entries by date, rating, title
- ✅ Diary page separate from main watchlist

### API Documentation
- ✅ Swagger UI at `/api-docs`
- ✅ All routes documented with request/response schemas
- ✅ Test API directly from the browser

### Security
- ✅ JWT access token (short-lived, in response body)
- ✅ Refresh token (long-lived, httpOnly cookie — not accessible by JS)
- ✅ Ownership validation — users can only modify their own movies
- ✅ CORS configured for frontend origin only
- ✅ Environment variables for all secrets
- ✅ `.env` excluded from version control

---

## 📂 Detailed File Reference

### Backend

```
backend/src/
├── server.ts                  # Express app entry point, middleware setup, route mounting
├── config/
│   ├── db.ts                  # MongoDB connection via Mongoose
│   └── swagger.ts             # Swagger/OpenAPI spec definition and schema declarations
├── controllers/
│   ├── authController.ts      # register, login, refreshAccessToken, logoutUser
│   └── movieController.ts     # getMovies, addMovie, updateMovie, deleteMovie, syncWatchlist
├── middleware/
│   ├── authMiddleware.ts      # JWT verification, attaches req.user to request
│   └── errorMiddleware.ts     # AppError class, 404 notFound handler, global errorHandler
├── models/
│   ├── user.ts                # User schema: name, email, password, role, refreshToken
│   └── movie.ts               # Movie schema: user ref, title, poster, imdbID, rating, watched
├── routes/
│   ├── authRoutes.ts          # POST /register, /login, /refresh, /logout
│   └── movieRoutes.ts         # GET, POST /movies | PUT, DELETE /movies/:id | POST /movies/sync
├── types/
│   └── index.ts               # AuthRequest, IUserDocument, IMovieDocument, IMovieInput, IMovieUpdate, ApiResponse
└── utils/
    └── generateToken.ts       # generateToken (15m access), generateRefreshToken (7d)
```

### Frontend

```
frontend/src/
├── App.tsx                    # Root component, React Router setup, route definitions
├── main.tsx                   # React DOM entry point, AuthProvider wrapper
├── index.css                  # Global Tailwind CSS imports
│
├── pages/
│   ├── loginPage.tsx          # Login form page, calls authService.login
│   ├── registerPage.tsx       # Register form page, calls authService.register
│   ├── watchListPage.tsx      # Main watchlist view with filtering and sorting
│   ├── searchPage.tsx         # OMDB movie search + add to watchlist
│   └── diaryPage.tsx          # Watched movies diary with date filtering
│
├── components/
│   ├── atoms/                 # Smallest reusable UI units
│   │   ├── button.tsx         # Reusable button with variants
│   │   ├── input.tsx          # Reusable input field
│   │   └── star.tsx           # Single star icon component
│   ├── molecules/             # Composed from atoms
│   │   ├── authForm.tsx       # Shared login/register form layout
│   │   ├── movieCard.tsx      # Single movie card with actions
│   │   ├── diaryEntry.tsx     # Single diary entry row
│   │   ├── protectedRoute.tsx # Redirects unauthenticated users to /login
│   │   ├── searchBar.tsx      # Movie search input with submit
│   │   ├── searchSortBar.tsx  # Combined search + sort controls
│   │   └── starRating.tsx     # Interactive 0–10 star rating input
│   ├── organisms/             # Complex sections composed of molecules
│   │   ├── movieList.tsx      # Renders list of movieCard components
│   │   ├── filterBar.tsx      # Watchlist filter controls (all/watched/unwatched)
│   │   ├── diaryList.tsx      # Renders list of diaryEntry components
│   │   ├── diaryFilterBar.tsx # Diary-specific filter controls
│   │   └── sideBar.tsx        # Navigation sidebar with route links
│   └── templates/
│       └── watchListLayout.tsx # Page shell: sidebar + header (with logout) + footer
│
├── context/
│   └── authContext.tsx        # AuthContext: user state, login, logout, isAuthenticated, isLoading
│
├── hooks/
│   ├── useAuth.ts             # Re-exports useAuth from authContext
│   ├── useWatchlist.ts        # All watchlist CRUD operations via watchlistServices
│   ├── useMovieSearch.ts      # OMDB API search logic and state
│   ├── useMovieFilter.ts      # Filter + sort logic for watchlist page
│   ├── useDiaryFilter.ts      # Filter logic for diary page
│   ├── useSearchSort.tsx      # Combined search and sort state
│   └── useLocalStorage.ts     # Generic localStorage hook (legacy/utility)
│
├── services/
│   ├── authService.ts         # register(), login(), getToken(), setToken(), clearToken(), getAuthHeaders()
│   ├── watchlistServices.ts   # fetchMovies(), addMovieToBackend(), updateMovieOnBackend(), deleteMovieFromBackend()
│   └── movieService.ts        # OMDB API calls: searchMovies(), getMovieById()
│
├── types/
│   ├── auth.ts                # User, LoginCredentials, RegisterCredentials, AuthResponse
│   └── movie.ts               # Movie interface matching backend schema
│
└── constants/
    ├── api.ts                 # API_ENDPOINTS object (REGISTER, LOGIN, MOVIES, REFRESH, LOGOUT)
    └── appConfig.ts           # App-wide config constants (OMDB base URL etc.)
```

---

## 🗄️ Database Schema

### User
```typescript
{
  name:         String,   // required
  email:        String,   // required, unique, lowercase
  password:     String,   // required, bcrypt hashed
  role:         String,   // 'user' | 'admin', default: 'user'
  refreshToken: String,   // stores current valid refresh token
  createdAt:    Date,     // auto
  updatedAt:    Date      // auto
}
```

### Movie
```typescript
{
  user:        ObjectId,  // ref: User — ownership link
  title:       String,    // required
  poster:      String,    // image URL
  imdbID:      String,    // required, unique per user
  rating:      Number,    // 0–10
  watched:     Boolean,   // default: false
  year:        String,
  type:        String,    // 'movie' | 'series'
  watchedDate: String,
  createdAt:   Date,      // auto
  updatedAt:   Date       // auto
}
```

---

## 🔐 Authentication Flow

```
1. Register / Login
   → Server returns short-lived ACCESS TOKEN (15 min) in response body
   → Server sets long-lived REFRESH TOKEN (7 days) as httpOnly cookie

2. Frontend stores access token in memory / sessionStorage
   → Attaches to every API request: Authorization: Bearer <token>

3. When access token expires (15 min)
   → Frontend calls POST /api/auth/refresh
   → Server reads httpOnly cookie, verifies refresh token
   → Returns new access token
   → Frontend continues seamlessly — no re-login

4. Logout
   → POST /api/auth/logout
   → Server clears refresh token from DB
   → Server clears httpOnly cookie
   → Frontend clears access token
```

---

## 🌐 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login, returns tokens |
| POST | `/refresh` | Public | Get new access token via cookie |
| POST | `/logout` | Public | Clear refresh token |

### Movie Routes — `/api/movies`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Private | Get all movies for logged-in user |
| POST | `/` | Private | Add movie to watchlist |
| PUT | `/:id` | Private | Update rating / watched / watchedDate |
| DELETE | `/:id` | Private | Delete movie from watchlist |
| POST | `/sync` | Private | Bulk replace entire watchlist |

### Other
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| GET | `/api-docs` | Swagger UI documentation |

---

## ⚙️ Environment Variables

### Backend — `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/watchlist
JWT_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend — `frontend/.env`
```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_API_BASE_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files. Both are listed in `.gitignore`.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier is fine)
- OMDB API key — get one free at [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)

### 1 — Clone the Repository
```bash
git clone https://github.com/<your_username>/movie-watchlist-app.git
cd movie-watchlist-app
```

### 2 — Setup Backend
```bash
cd backend
npm install
```
Create `backend/.env` and fill in your values (see Environment Variables above).

```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 3 — Setup Frontend
```bash
cd ../frontend
npm install
```
Create `frontend/.env` and fill in your values.

```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

### 4 — Open the App
```
http://localhost:5173
```

---

## 📚 API Documentation (Swagger)

With the backend running, open:
```
http://localhost:5000/api-docs
```

**How to test protected routes in Swagger:**
1. Run `POST /api/auth/login` — copy the `token` from the response
2. Click the **Authorize** button (top right)
3. Paste the token → click **Authorize**
4. All protected routes now send the token automatically

---

## 🏗️ Architecture — MVC Pattern

```
Request
  ↓
server.ts          (Express app, middleware, route mounting)
  ↓
routes/            (URL mapping → controller functions)
  ↓
middleware/        (authMiddleware → verify JWT → attach req.user)
  ↓
controllers/       (business logic — async/await, try/catch)
  ↓
models/            (Mongoose schemas — DB interaction)
  ↓
MongoDB Atlas      (cloud database)
```

---

## 🔒 Security Measures

| Measure | Implementation |
|---|---|
| Password hashing | bcrypt with salt rounds 10 |
| Access token expiry | 15 minutes |
| Refresh token storage | httpOnly cookie (not accessible by JavaScript) |
| Refresh token in DB | Stored and validated server-side |
| Route protection | `authMiddleware` on all movie routes |
| Ownership validation | All movie queries filter by `user: req.user._id` |
| CORS | Restricted to `CLIENT_URL` only |
| Secrets | All in `.env`, never committed to git |

---

## 🚀 Deployment

### Backend — Render (Free Tier)
1. Push `backend/` to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** → `backend`
4. **Build Command** → `npm install && npm run build`
5. **Start Command** → `npm start`
6. Add all environment variables in Render dashboard

### Frontend
Update `frontend/.env` with the live Render URL:
```env
VITE_API_BASE_URL=https://movie-watchlist-api.onrender.com/api
VITE_BACKEND_URL=https://movie-watchlist-api.onrender.com
```

---

## 📋 Available Scripts

### Backend
```bash
npm run dev      # Start with nodemon (hot reload)
npm run build    # Compile TypeScript to dist/
npm start        # Run compiled JS (production)
```

### Frontend
```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 👤 Author

Built as a full-stack portfolio project demonstrating:
- REST API design with Express + TypeScript
- MVC architecture
- JWT authentication with refresh token rotation
- React component architecture (Atomic Design)
- MongoDB schema modeling
- Secure API best practices