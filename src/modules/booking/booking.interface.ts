import { Types } from 'mongoose';
import { TRoom } from '../room/room.interface';
import { TSlot } from '../slot/slot.interface';
import { IUser } from '../user/user.interface';

export type TBooking = {
  room: Types.ObjectId | TRoom;
  slots: (Types.ObjectId | TSlot)[];
  user: Types.ObjectId | IUser;
  date: string;
  totalAmount?: number;
  isDeleted?: boolean;
  isConfirmed?: string;
};
