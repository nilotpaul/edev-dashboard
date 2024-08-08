import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../../types';
import { env } from '../validations/env';
import { accessTokenConfig, sessionCookieConfig } from '../config/jwt';
import { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  enteredPassword: string,
  storedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

export const signAccessToken = (payload: Pick<IUser, '_id' | 'username' | 'email' | 'role'>) => {
  return jwt.sign(payload, env.JWT_SECRET, accessTokenConfig);
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, accessTokenConfig);
    return { valid: true, decoded };
  } catch (err) {
    console.error('jwt verification error:', err);

    return { valid: false, decoded: null };
  }
};

export const setSessionCookie = (c: Context, token: string) => {
  setCookie(c, 'session_token', token, sessionCookieConfig);
};

export const getSessionCookie = (c: Context) => {
  return getCookie(c, 'session_token');
};
