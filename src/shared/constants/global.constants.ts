//eslint-disable-next-line
require('dotenv').config();

// export const JWT_SECRET = process.env.JWT_SIGNATURE;
export const JWT_EXPIRY_SECONDS = 3600;

export enum ROLES_ENUM {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TEACHER: 'teacher',
};
export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 100;

export const DEFAULT_SORT_BY = 'id';

export const API_PREFIX = '/api/v1';

//Regex
export const PHONE_REGEX = /^[0-9\s+-.()]+$/;

export const SLUG_SEPARATOR = '-';
export const PORT = process.env.PORT || 4000;

export const DATABASE_URL = process.env.DATABASE_URL;
export const DATABASE_PROVIDER = process.env.DATABASE_PROVIDER;
export const JWTSecret = process.env.JWT_SECRET;
