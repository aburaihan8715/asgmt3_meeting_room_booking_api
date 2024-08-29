import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoom } from './room.interface';
import { Room } from './room.model';
import QueryBuilder from '../../builder/QueryBuilder';
// import { roomSearchableFields } from './room.constant';

// CREATE
const createRoomIntoDB = async (payload: TRoom) => {
  const newRoom = await Room.create(payload);

  if (!newRoom) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to creating new room!',
    );
  }
  return newRoom;
};

// GET ALL
const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(
    Room.find({ isDeleted: { $ne: true } }),
    query,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await roomQuery.modelQuery;
  const meta = await roomQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET ONE
const getRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found !');
  }

  if (result && result.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room has been deleted!');
  }
  return result;
};

// UPDATE ONE
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found !');
  }

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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found !');
  }

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
