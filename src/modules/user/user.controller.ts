import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';

// SIGNUP/CREATE USER
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: newUser,
  });
});

// GET ALL USERS
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  if (!result || result?.result.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

// MAKE ADMIN USER
const makeAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.body._id;
  const adminUser = await UserServices.makeAdminFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Making admin success!',
    data: adminUser,
  });
});

export const UserControllers = {
  registerUser,
  getAllUsers,
  makeAdmin,
};
