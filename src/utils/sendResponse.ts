// import { Response } from 'express';

// type TMeta = {
//   page: number;
//   limit: number;
//   total: number;
//   totalPage: number;
// };

// type TResponse<T> = {
//   statusCode: number;
//   success: boolean;
//   message?: string;
//   meta?: TMeta;
//   data: T;
// };

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data?.statusCode).json({
//     success: data.success,
//     message: data.message,
//     meta: data.meta,
//     data: data.data,
//   });
// };

// export default sendResponse;

import { Response } from 'express';

type TMeta = {
  limit: number;
  page: number;
  totalDocs: number;
  totalPage: number;
  hasNextPage?: boolean;
};

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  let result;

  if (Array.isArray(data?.data)) {
    result = data.data.length;
  } else if (typeof data?.data === 'object' && data?.data !== null) {
    result = 1;
  }
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    result: result ?? null,
    meta: data.meta,
    data: data.data,
  });
};

export default sendResponse;
