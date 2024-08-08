import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types';
import { USER_ROLE } from '../config/user';

// Define the Post schema
const UserSchema: Schema = new Schema<IUser>(
  {
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
    role: {
      type: String,
      enum: USER_ROLE,
      default: 'admin',
      required: true,
    },
    accessToken: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: { createdAt: true } }
);

// Export the Post model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
