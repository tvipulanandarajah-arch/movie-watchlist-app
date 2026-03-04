import { Request } from 'express';
import { Document, Types } from 'mongoose';

// Extends Express Request to include authenticated user
export interface AuthRequest extends Request {
  user?: IUserDocument;
}

// User document interface (matches MongoDB document)
export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  createdAt: Date;
}

// Movie document interface (matches MongoDB document)
export interface IMovieDocument extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  poster: string;
  imdbID: string;
  rating: number;
  watched: boolean;
  year?: string;
  type?: string;
  watchedDate?: string;
  createdAt: Date;
}

// Shape of data used to create a movie
export interface IMovieInput {
  title: string;
  poster: string;
  imdbID: string;
  rating: number;
  watched: boolean;
  year?: string;
  type?: string;
  watchedDate?: string;
}

// Shape of data used to update a movie
export interface IMovieUpdate {
  rating?: number;
  watched?: boolean;
  watchedDate?: string;
}

// Standard API response shape
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}