import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types';
import { USER_TYPE } from '../config/user';

// Define the Post schema
const UserSchema: Schema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: USER_TYPE,
    default: 'admin',
    required: true,
  },
  accessToken: {
    type: String,
    default: undefined,
  },
});

// Export the Post model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
