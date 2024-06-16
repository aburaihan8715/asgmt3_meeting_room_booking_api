import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

// CREATE
const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;

  const createHourlySlots = async (start: string, end: string) => {
    const slots = [];
    let current = new Date(`${date}T${start}`);
    const endTime = new Date(`${date}T${end}`);

    while (current < endTime) {
      const next = new Date(current);
      next.setHours(current.getHours() + 1);

      if (next > endTime) break;

      slots.push({
        room: room,
        date: new Date(date).toISOString().split('T')[0],
        startTime: current.toTimeString().slice(0, 5),
        endTime: next.toTimeString().slice(0, 5),
        isBooked: false,
      });

      current = next;
    }

    return slots;
  };

  const slotsData = await createHourlySlots(startTime, endTime);

  const result = await Slot.insertMany(slotsData);

  return result;
};

// GET ALL
const getAllSlotsFromDB = async (queryObj: Record<string, unknown>) => {
  let filter: Record<string, unknown> = { isBooked: { $ne: true } };

  if (queryObj && queryObj.date && queryObj.roomId) {
    filter = { date: queryObj.date, room: queryObj.roomId, isBooked: false };
  }
  const result = await Slot.find(filter).populate('room');
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
