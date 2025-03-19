import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const registerUserIntoDB = async (payload: IUser) => {
  let newUser = await User.create(payload);

  if (!newUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to cerate user. Try again!',
    );
  }
  newUser = newUser.toObject();
  delete newUser.password;

  return newUser;
};

// GET ALL
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  const meta = await userQuery.calculatePaginate();

  return {
    meta,
    result,
  };
};

const makeAdminFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
  }

  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getAllUsersFromDB,
  makeAdminFromDB,
};
