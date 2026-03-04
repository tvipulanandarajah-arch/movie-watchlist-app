import mongoose, { Schema } from 'mongoose';
import { IMovieDocument } from '../types/index';

const MovieSchema = new Schema<IMovieDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
    },
    poster: {
      type: String,
      default: '',
    },
    imdbID: {
      type: String,
      required: [true, 'IMDB ID is required'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    watched: {
      type: Boolean,
      default: false,
    },
    year: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'movie',
    },
    watchedDate: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent same user from adding same movie twice
MovieSchema.index({ user: 1, imdbID: 1 }, { unique: true });

const Movie = mongoose.model<IMovieDocument>('Movie', MovieSchema);

export default Movie;