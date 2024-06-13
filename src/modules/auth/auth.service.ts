import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const signUpUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const loginUserFromDB = async (payload: TLoginUser) => {
  const result = await User.findOne({ email: payload.email });
  return result;
};

export const AuthServices = {
  signUpUserIntoDB,
  loginUserFromDB,
};
