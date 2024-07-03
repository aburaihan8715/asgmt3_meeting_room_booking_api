import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';

// CREATE
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

// GET ALL
const getAllRoomsFromDB = async () => {
  const result = await Room.find({ isDeleted: { $ne: true } });
  return result;
};

// GET ONE
const getRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);

  if (result && result.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room has been deleted!');
  }
  return result;
};

// UPDATE ONE
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    {
      new: true,
    },
  );

  if (result && result.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room has been deleted!');
  }
  return result;
};

// DELETE ONE
const deleteRoomIntoDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
