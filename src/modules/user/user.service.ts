import config from '../../config';
import AppError from '../../errors/AppError';
import { TLoginUser, IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken } from './user.utils';

const signUpUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};
const loginUserFromDB = async (payload: TLoginUser) => {
  // 01. checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) return null;

  // 02. checking if the password is correct
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload?.password,
    user?.password as string,
  );
  if (!isPasswordCorrect) throw new AppError(400, 'Wrong credentials!');

  // 03. create token and sent to the  client
  const jwtPayload = {
    id: user._id,
    role: user.role as string,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    token,
    refreshToken,
    user,
  };
};

export const UserServices = {
  signUpUserIntoDB,
  loginUserFromDB,
};
