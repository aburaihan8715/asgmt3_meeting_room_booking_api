import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { minutesToTimeString, timeStringToMinutes } from './slot.utils';

// CREATE
const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60;
  const statTimeInMinutes = timeStringToMinutes(startTime);
  const endTimeInMinutes = timeStringToMinutes(endTime);

  const totalTime = endTimeInMinutes - statTimeInMinutes;
  const numberOfSlots = Number(totalTime / slotDuration);

  const slots = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = statTimeInMinutes + i * slotDuration;
    const endTimeInMinutes = slotStartMinutes + slotDuration;

    const slotStartTimeString = minutesToTimeString(slotStartMinutes);
    const slotEndTimeString = minutesToTimeString(endTimeInMinutes);

    slots.push({
      room,
      date,
      startTime: slotStartTimeString,
      endTime: slotEndTimeString,
      isBooked: false,
    });
  }

  const result = await Slot.insertMany(slots);
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
