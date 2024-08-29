import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import config from '../../config';
import { AuthServices } from './auth.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// LOGIN
const login = catchAsync(async (req: Request, res: Response) => {
  const userInfo = await AuthServices.loginFromDB(req.body);

  const { refreshToken, accessToken, user } = userInfo;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: { accessToken, user },
  });
});

export const AuthControllers = {
  login,
};
