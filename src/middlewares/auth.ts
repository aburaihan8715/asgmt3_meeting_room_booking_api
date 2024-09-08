import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';
import sendUnauthenticatedResponse from '../utils/sendUnauthenticatedResponse';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      // 01 check token
      let token = '';
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) return sendUnauthenticatedResponse(res);

      // 02 verify the token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, id } = decoded;

      // 03 check user still exists
      const user = await User.getUserById(id);

      if (!user) return sendUnauthenticatedResponse(res);
      // 04 check authorization if needed
      if (requiredRoles && !requiredRoles.includes(role)) {
        return sendUnauthenticatedResponse(res);
      }

      // 05 set user in the request
      req.user = decoded as JwtPayload;

      // 06 grand access the user!!
      next();
    },
  );
};

export default auth;
