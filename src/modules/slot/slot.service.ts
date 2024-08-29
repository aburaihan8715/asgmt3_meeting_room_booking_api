/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { minutesToTimeString, timeStringToMinutes } from './slot.utils';

type TQueryObject = {
  date?: string;
  roomId?: string;
};
type TFilter = Record<string, unknown>;

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

  const newSlot = await Slot.insertMany(slots);

  if (!newSlot || newSlot.length < 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to cerate new slot!',
    );
  }
  return newSlot;
};

// GET ALL
const getAllSlotsFromDB = async (queryObj: TQueryObject) => {
  let filter: TFilter = { isBooked: { $ne: true } };
  // console.log(filter);

  if (queryObj && queryObj.date && queryObj.roomId) {
    filter = {
      date: queryObj.date,
      room: queryObj.roomId,
      isBooked: false,
    };
  }
  const result = await Slot.find(filter).populate('room').exec();
  let sortedResult: any = [];

  if (result && result.length > 0) {
    sortedResult = result.filter((item) => !(item.room as any)?.isDeleted);
  }

  if (sortedResult.length <= 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There are no available slots!',
    );
  }

  return sortedResult;
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
