import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// CREATE
const createSlot = catchAsync(async (req: Request, res: Response) => {
  const newSlot = await SlotServices.createSlotIntoDB(req.body);

  if (!newSlot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to cerate new slot!');
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slots created successfully!',
    data: newSlot,
  });
});

// GET ALL
const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const slots = await SlotServices.getAllSlotsFromDB(req.query);

  if (!slots || slots.length < 1) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Available slots retrieved successfully!',
    data: slots,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
