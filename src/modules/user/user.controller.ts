import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import config from '../../config';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';

// SIGNUP
const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserServices.signUpUserIntoDB(req.body);
  const restData = newUser.toObject();
  delete restData.password;

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: restData,
  });
});

// LOGIN
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const userInfo = await UserServices.loginUserFromDB(req.body);

  if (!userInfo) return sendNotFoundDataResponse(res);

  const { refreshToken, accessToken, user } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    accessToken,
    data: user,
  });
});

export const UserControllers = {
  signUpUser,
  loginUser,
};
