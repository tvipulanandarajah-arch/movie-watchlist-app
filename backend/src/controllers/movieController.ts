import { Response, NextFunction } from 'express';
import Movie from '../models/movie';
import { AuthRequest, IMovieInput, IMovieUpdate } from '../types/index';
import { AppError } from '../middleware/errorMiddleware';

// ─────────────────────────────────────────────────
// @desc    Get all movies for logged-in user
// @route   GET /api/movies
// @access  Private
// ─────────────────────────────────────────────────
export const getMovies = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movies = await Movie.find({ user: req.user!._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Add a movie to the watchlist
// @route   POST /api/movies
// @access  Private
// ─────────────────────────────────────────────────
export const addMovie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, poster, imdbID, rating, watched, year, type, watchedDate } =
      req.body as IMovieInput;

    // Validate required fields
    if (!title || !imdbID) {
      throw new AppError('Title and IMDB ID are required', 400);
    }

    // Check if movie already exists in user's watchlist
    const existingMovie = await Movie.findOne({
      user: req.user!._id,
      imdbID,
    });

    if (existingMovie) {
      throw new AppError('This movie is already in your watchlist', 400);
    }

    const movie = await Movie.create({
      user: req.user!._id,
      title,
      poster: poster || '',
      imdbID,
      rating: rating || 0,
      watched: watched || false,
      year: year || '',
      type: type || 'movie',
      watchedDate: watchedDate || '',
    });

    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Update a movie (rating, watched, watchedDate)
// @route   PUT /api/movies/:id
// @access  Private
// ─────────────────────────────────────────────────
export const updateMovie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body as IMovieUpdate;

    // Find movie and verify it belongs to the logged-in user
    const movie = await Movie.findOne({ _id: id, user: req.user!._id });

    if (!movie) {
      throw new AppError('Movie not found or you do not have permission', 404);
    }

    // Apply only allowed updates
    if (updates.rating !== undefined) movie.rating = updates.rating;
    if (updates.watched !== undefined) movie.watched = updates.watched;
    if (updates.watchedDate !== undefined) movie.watchedDate = updates.watchedDate;

    const updatedMovie = await movie.save();

    res.status(200).json({
      success: true,
      data: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Delete a movie from the watchlist
// @route   DELETE /api/movies/:id
// @access  Private
// ─────────────────────────────────────────────────
export const deleteMovie = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Find movie and verify ownership before deleting
    const movie = await Movie.findOne({ _id: id, user: req.user!._id });

    if (!movie) {
      throw new AppError('Movie not found or you do not have permission', 404);
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      data: { message: 'Movie removed from watchlist', id },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Sync entire watchlist (bulk replace — used for localStorage migration)
// @route   POST /api/movies/sync
// @access  Private
// ─────────────────────────────────────────────────
export const syncWatchlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movies = req.body.movies as IMovieInput[];

    if (!Array.isArray(movies)) {
      throw new AppError('movies must be an array', 400);
    }

    // Delete all existing movies for this user
    await Movie.deleteMany({ user: req.user!._id });

    // Insert all provided movies linked to this user
    const moviesToInsert = movies.map((m) => ({
      ...m,
      user: req.user!._id,
    }));

    const inserted = await Movie.insertMany(moviesToInsert);

    res.status(200).json({
      success: true,
      data: inserted,
    });
  } catch (error) {
    next(error);
  }
};