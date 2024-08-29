import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createRoom = catchAsync(async (req: Request, res: Response) => {
  const newRoom = await RoomServices.createRoomIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully!',
    data: newRoom,
  });
});

// GET ALL
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const rooms = await RoomServices.getAllRoomsFromDB();

  if (!rooms || rooms.length < 1) return sendNotFoundDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully!',
    data: rooms,
  });
});

// GET ONE
const getRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.getRoomFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully!',
    data: room,
  });
});

// UPDATE ONE
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const updatedRoom = await RoomServices.updateRoomIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully!',
    data: updatedRoom,
  });
});

// DELETE ONE
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const deletedRoom = await RoomServices.deleteRoomIntoDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully!',
    data: deletedRoom,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
