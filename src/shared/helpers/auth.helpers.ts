import * as bcrypt from 'bcryptjs';

const hash = async (password: string) => {
  const saltOrRounds = await bcrypt.genSalt();
  return await bcrypt.hash(password, saltOrRounds);
};

const verify = async (password: string, hash) => {
  return await bcrypt.compare(password, hash);
};

export const AuthHelpers = {
  hash,
  verify,
};
