// src/domain/errors/error-registry.ts

import { CodesError } from "./codes.error";


export const ErrorRegistry = {
  [CodesError.USER_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.PROFILE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.TALK_LANGAGE_NOT_FOUND]: {
    httpStatus: 404,
  },
  [CodesError.DUPLICATE_USER]: {
    httpStatus: 400,
  },
  [CodesError.DUPLICATE_PROFILE]: {
    httpStatus: 400,
  },
  [CodesError.DUPLICATE_TALK_LANGAGE]: {
    httpStatus: 400,
  },
  [CodesError.EMAIL_ALREADY_EXISTS]: {
    httpStatus: 400,
  },
 
} as const;
