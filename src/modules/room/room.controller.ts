import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';

// CREATE
const createRoom = catchAsync(async (req: Request, res: Response) => {
  const newRoom = await RoomServices.createRoomIntoDB(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Room added successfully',
    data: newRoom,
  });
});

// GET ALL
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  const rooms = await RoomServices.getAllRoomsFromDB();

  if (!rooms || rooms.length < 1) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Rooms retrieved successfully!',
    data: rooms,
  });
});

// GET ONE
const getRoom = catchAsync(async (req: Request, res: Response) => {
  const room = await RoomServices.getRoomFromDB(req.params.id);

  if (!room) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room retrieved successfully',
    data: room,
  });
});

// UPDATE ONE
const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const updatedRoom = await RoomServices.updateRoomIntoDB(
    req.params.id,
    req.body,
  );
  if (!updatedRoom) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room updated successfully',
    data: updatedRoom,
  });
});

// DELETE ONE
const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const deletedRoom = await RoomServices.deleteRoomIntoDB(req.params.id);

  if (!deletedRoom) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room deleted successfully',
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
