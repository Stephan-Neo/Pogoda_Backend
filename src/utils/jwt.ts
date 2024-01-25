import * as jwt from 'jwt-simple';

const envs = process.env;

export interface JwtPayload {
  userId: string;
  expires: Date;
}

export const generate = (userId: string, expires: Date): string => {
  const payload: JwtPayload = {
    userId,
    expires,
  };
  return jwt.encode(payload, envs.JWT_SECRET);
};

export const verify = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token, envs.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
