import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password?: undefined | string;
  phone?: string;
  address?: string;
  role?: 'user' | 'admin';
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>;
  isPasswordCorrect(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
