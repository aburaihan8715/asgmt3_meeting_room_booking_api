export type TRoom = {
  roomName: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
  coverImage: string;
  isDeleted: boolean;
  isBooked: boolean;
};
