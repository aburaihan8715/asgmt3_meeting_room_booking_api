import { z } from 'zod';

const signupValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }).trim(),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address' }),

    password: z.string({ required_error: 'Password is required.' }),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const UserValidations = {
  signupValidationSchema,
  loginValidationSchema,
};
