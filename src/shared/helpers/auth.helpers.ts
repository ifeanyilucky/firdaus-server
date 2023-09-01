import { randomBytes, scrypt } from 'crypto';
import * as bcrypt from 'bcryptjs';

const hash = async (password: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

const verify = async (password: string, hash) => {
  return await bcrypt.compare(password, hash);
};

export const AuthHelpers = {
  hash,
  verify,
};
