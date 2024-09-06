/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { minutesToTimeString, timeStringToMinutes } from './slot.utils';
import QueryBuilder from '../../builder/QueryBuilder';

// CREATE

const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;

  // check already exists
  const slot = await Slot.findOne({ room, date });

  if (slot) {
    throw new AppError(httpStatus.BAD_REQUEST, 'The slot already exists!');
  }

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
const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  let filter: { [key: string]: unknown } = { isBooked: { $ne: true } };

  if (query && query.date && query.room) {
    filter = {
      ...filter,
      date: query.date,
      room: query.room,
    };
  }

  // Initialize the QueryBuilder with the Slot query
  const slotQuery = new QueryBuilder(
    Slot.find(filter).populate('room'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  // Execute the query and get the results
  const result = await slotQuery.modelQuery;

  // Additional filtering to remove slots where the associated room is deleted
  const sortedResult = result.filter(
    (item) => !(item.room as any)?.isDeleted,
  );

  // Handle the case where there are no available slots
  if (sortedResult.length <= 1) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'There are no available slots!',
    );
  }

  // Get the total count of the results for pagination metadata
  const meta = await slotQuery.countTotal();

  return {
    result: sortedResult,
    meta,
  };
};

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
};
