import { TRoom } from './room.interface';
import { Room } from './room.model';

// CREATE
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

// GET ALL
const getAllRoomsFromDB = async () => {
  const result = await Room.find({});
  return result;
};

// GET ONE
const getRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

// UPDATE ONE
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const { amenities, ...primitivesData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...primitivesData,
  };

  if (amenities && Object.keys(amenities).length) {
    for (const [key, value] of Object.entries(amenities)) {
      modifiedUpdatedData[`amenities.${key}`] = value;
    }
  }

  const result = await Room.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });
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
