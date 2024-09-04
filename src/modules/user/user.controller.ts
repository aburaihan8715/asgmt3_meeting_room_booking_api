import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// SIGNUP
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

export const UserControllers = {
  registerUser,
};
