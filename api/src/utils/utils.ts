import bcrypt from 'bcryptjs';

import { SALT } from '../constants/salt';

export const makeHashedPassword = async (p: string) => {
  return await bcrypt.hash(p, 12);
}

export const makeToken = async (text: string) => {
  return await bcrypt.hash(SALT + text, 10);
}

export const isEmpty = (v: string) => {
  return !v && v.trim() === "";
}
