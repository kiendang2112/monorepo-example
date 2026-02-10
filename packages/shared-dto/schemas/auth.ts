import z from "zod";

export const AuthSchema = {
  requestLogin: z.object({
    email: z.string('Email is required'),
    password: z.string('Password is required').min(8, 'Password must be at least 8 characters'),
  }),
  responseLogin: z.object({
    accessToken: z.string('Access token is required'),
    refreshToken: z.string('Refresh token is required'),
  })
};
