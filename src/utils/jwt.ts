import { verify } from 'jsonwebtoken';
import { JWTSecret } from 'src/shared/constants/global.constants';

export const retrieve = async <T>(token: string) => {
  return new Promise<T>((resolve, reject) => {
    verify(token, JWTSecret, (err, value) => {
      if (err) return reject(err);
      resolve(value as T);
    });
  });
};
