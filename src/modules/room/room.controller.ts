import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const newRoom = await RoomServices.createRoomIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room added successfully',
    data: newRoom,
  });
});

const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: null,
  });
});
const getRoom = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: null,
  });
});
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: null,
  });
});
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: null,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
