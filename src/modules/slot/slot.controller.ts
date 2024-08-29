import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createSlot = catchAsync(async (req: Request, res: Response) => {
  const newSlot = await SlotServices.createSlotIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slots created successfully!',
    data: newSlot,
  });
});

// GET ALL
const getAllSlots = catchAsync(async (req: Request, res: Response) => {
  const slots = await SlotServices.getAllSlotsFromDB(req.query);

  if (!slots || slots.length < 1) return sendNotFoundDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully!',
    data: slots,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
};
