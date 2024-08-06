import { SignOptions } from 'jsonwebtoken';
import { env } from '../validations/env';
import { CookieOptions } from 'hono/utils/cookie';

const expiresInHours = 4;

export const accessTokenConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '4h',
  issuer: 'evolvedev.info',
};

export const sessionCookieConfig = {
  domain: env.NODE_ENV !== 'PROD' ? 'localhost' : 'dash.evolveasdev.com',
  expires: new Date(Date.now() + expiresInHours * 60 * 60 * 1000),
  httpOnly: true,
  sameSite: 'Strict',
  secure: env.NODE_ENV === 'PROD',
} satisfies CookieOptions;
