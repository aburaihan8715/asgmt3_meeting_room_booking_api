import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// SIGNUP
const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserServices.signUpUserIntoDB(req.body);

  if (!newUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to cerate user. Try again!',
    );
  }
  const user = newUser.toObject();
  delete user.password;

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: user,
  });
});

// LOGIN
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userInfo = await UserServices.loginUserFromDB(req.body);

  if (!userInfo)
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to login! Try again!');

  const { refreshToken, token, user } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  const userObject = user.toObject();
  delete userObject.password;

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token,
    data: userObject,
  });
});

export const UserControllers = {
  signUpUser,
  loginUser,
};
