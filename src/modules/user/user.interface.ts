import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: undefined | string;
  phone?: string;
  address?: string;
  role?: 'user' | 'admin';
}

export interface UserModel extends Model<IUser> {
  getUserById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  isPasswordCorrect(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
