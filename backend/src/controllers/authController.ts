import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import generateToken, { generateRefreshToken } from '../utils/generateToken';
import { AppError } from '../middleware/errorMiddleware';
import { AuthRequest } from '../types/index';
import jwt from 'jsonwebtoken';

// ← Helper: sets refresh token as httpOnly cookie
const setRefreshCookie = (res: Response, token: string): void => {
  res.cookie('refreshToken', token, {
    httpOnly: true,       // ← JS cannot read this cookie (XSS protection)
    secure: process.env.NODE_ENV === 'production',  // ← HTTPS only in prod
    sameSite: 'strict',   // ← CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // ← 7 days in milliseconds
  });
};

// ─────────────────────────────────────────────────
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError('Please provide name, email and password', 400);
    }
    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('An account with this email already exists', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ← Generate refresh token before creating user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // ← Store refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // ← Send refresh token as httpOnly cookie
    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: accessToken,  // ← short-lived access token in response body
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw new AppError('Invalid email or password', 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // ← Store new refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // ← Send refresh token as httpOnly cookie
    setRefreshCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Refresh access token using refresh token cookie
// @route   POST /api/auth/refresh
// @access  Public (uses httpOnly cookie)
// ─────────────────────────────────────────────────
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // ← Read refresh token from httpOnly cookie
    const token = req.cookies?.refreshToken as string | undefined;

    if (!token) {
      throw new AppError('No refresh token provided', 401);
    }

    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) throw new AppError('REFRESH_TOKEN_SECRET not defined', 500);

    // ← Verify the refresh token
    const decoded = jwt.verify(token, secret) as { id: string };

    // ← Find user and check stored refresh token matches
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) {
      throw new AppError('Invalid refresh token', 401);
    }

    // ← Issue new access token
    const newAccessToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      data: { token: newAccessToken },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────
// @desc    Logout — clear refresh token
// @route   POST /api/auth/logout
// @access  Private
// ─────────────────────────────────────────────────
export const logoutUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.refreshToken as string | undefined;

    if (token) {
      // ← Remove refresh token from DB
      await User.findOneAndUpdate(
        { refreshToken: token },
        { refreshToken: null }
      );
    }

    // ← Clear the httpOnly cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      data: { message: 'Logged out successfully' },
    });
  } catch (error) {
    next(error);
  }
};