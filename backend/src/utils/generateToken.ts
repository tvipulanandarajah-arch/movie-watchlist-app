import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

// ← Access token: short-lived (15 minutes)
const generateToken = (id: Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');

  return jwt.sign({ id: id.toString() }, secret, {
    expiresIn: '15m',
  });
};

// ← Refresh token: long-lived (7 days)
export const generateRefreshToken = (id: Types.ObjectId): string => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) throw new Error('REFRESH_TOKEN_SECRET is not defined');

  return jwt.sign({ id: id.toString() }, secret, {
    expiresIn: '7d',
  });
};

export default generateToken;