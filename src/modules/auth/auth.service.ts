import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import { createToken } from './auth.utils';

const loginFromDB = async (payload: TLogin) => {
  // 01. checking if the user is exist
  let user = await User.getUserByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // 02. checking if the password is correct
  const isPasswordCorrect = await User.isPasswordCorrect(
    payload?.password,
    user?.password as string,
  );
  if (!isPasswordCorrect) throw new AppError(400, 'Wrong credentials!');

  // 03. create accessToken and refreshToken
  const jwtPayload = {
    id: user._id,
    role: user.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  // 04. delete password form the user
  user = user.toObject();
  delete user.password;

  // 05. return tokens and user to the controller
  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthServices = {
  loginFromDB,
};
