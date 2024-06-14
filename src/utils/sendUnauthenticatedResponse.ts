import { Response } from 'express';

const sendUnauthenticatedResponse = (res: Response) => {
  res.status(401).json({
    success: false,
    statusCode: 401,
    message: 'You have no access to this route',
  });
};

export default sendUnauthenticatedResponse;
