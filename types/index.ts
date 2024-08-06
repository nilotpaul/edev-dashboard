import { Document } from 'mongoose';
import { USER_TYPE } from '../src/config/user';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  type: (typeof USER_TYPE)[number];
  accessToken?: string;
}

export type User = Pick<IUser, 'email' | 'type' | 'username' | 'id'>;
