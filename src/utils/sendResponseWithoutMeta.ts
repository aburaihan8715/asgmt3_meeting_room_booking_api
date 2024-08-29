import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  let result: number | null;
  if (Array.isArray(data.data)) {
    result = data.data.length;
  } else if (typeof data.data === 'object' && data.data !== null) {
    result = 1;
  } else {
    result = null;
  }
  res.status(data?.statusCode).json({
    success: data.success,
    result,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
