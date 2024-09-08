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
  const result = await SlotServices.getAllSlotsFromDB(req.query);

  if (!result || result.result.length < 1)
    return sendNotFoundDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

// GET ONE
const getSlot = catchAsync(async (req: Request, res: Response) => {
  const room = await SlotServices.getSlotFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrieved successfully!',
    data: room,
  });
});

// UPDATE ONE
const updateSlot = catchAsync(async (req: Request, res: Response) => {
  const updatedRoom = await SlotServices.updateSlotIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot updated successfully!',
    data: updatedRoom,
  });
});

// DELETE ONE
const deleteSlot = catchAsync(async (req: Request, res: Response) => {
  const deletedRoom = await SlotServices.deleteSlotFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot deleted successfully!',
    data: deletedRoom,
  });
});

export const SlotControllers = {
  createSlot,
  getAllSlots,
  deleteSlot,
  getSlot,
  updateSlot,
};
