import { Document } from 'mongoose';
import { USER_ROLE } from '../src/config/user';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: (typeof USER_ROLE)[number];
  accessToken?: string;
}

export type User = Pick<IUser, 'email' | 'role' | 'username' | '_id'>;
