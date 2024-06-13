import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const signUpUser = async (req: Request, res: Response) => {
  try {
    const newUser = await AuthServices.signUpUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: 'User successfully signed up',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to sign up',
      error,
    });
  }
};
const loginUser = async (req: Request, res: Response) => {
  try {
    await AuthServices.loginUserFromDB(req.body);

    res.status(200).json({
      success: true,
      message: 'User successfully logged in',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to logged in',
      error,
    });
  }
};

export const AuthControllers = {
  signUpUser,
  loginUser,
};
