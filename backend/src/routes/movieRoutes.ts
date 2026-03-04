import { Router } from 'express';
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  syncWatchlist,
} from '../controllers/movieController';
import protect from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies for logged-in user
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of movies returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MovieResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getMovies);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Add a movie to the watchlist
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieRequest'
 *     responses:
 *       201:
 *         description: Movie added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieResponse'
 *       400:
 *         description: Missing fields or duplicate movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', addMovie);

/**
 * @swagger
 * /api/movies/sync:
 *   post:
 *     summary: Bulk sync watchlist (replaces all movies)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movies:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/MovieRequest'
 *     responses:
 *       200:
 *         description: Watchlist synced successfully
 *       401:
 *         description: Not authorized
 */
router.post('/sync', syncWatchlist);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie (rating, watched, watchedDate)
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *         example: 64b1f2c3d4e5f6a7b8c9d0e1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieUpdateRequest'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MovieResponse'
 *       404:
 *         description: Movie not found or permission denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie from the watchlist
 *     tags: [Movies]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *         example: 64b1f2c3d4e5f6a7b8c9d0e1
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found or permission denied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteMovie);

export default router;