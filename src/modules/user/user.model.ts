import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TUser>('User', userSchema);
