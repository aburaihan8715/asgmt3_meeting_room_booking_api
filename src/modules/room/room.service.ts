import { TRoom } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};
const getAllRoomsFromDB = async (payload: TRoom) => {};
const getRoomFromDB = async (payload: TRoom) => {};
const updateRoomIntoDB = async (payload: TRoom) => {};
const deleteRoomIntoDB = async (payload: TRoom) => {};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getRoomFromDB,
  updateRoomIntoDB,
  deleteRoomIntoDB,
};
