// src/domain/errors/error-registry.ts

import { CodesError } from "./codes.error";


export const ErrorRegistry = {
  [CodesError.TITLE_REQUIRED]: {
    httpStatus: 400,
  },
  [CodesError.PUBLIC_ID_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.PASSWORD_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.EMAIL_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.FIRST_NAME_REQUIRED]: {
    httpStatus: 400,
  },
  [CodesError.LAST_NAME_REQUIRED]: {
    httpStatus: 400,
  },
  [CodesError.BIRTH_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.PHONE_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.ADDRESS_REQUIRED]: {
    httpStatus: 400,
  },
  [CodesError.GITHUB_URL_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.LINKEDIN_URL_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.STAGE_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.STATUS_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.TALK_LANGUAGE_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.USER_INVALID]: {
    httpStatus: 400,
  },
  [CodesError.WHATSAPP_INVALID]: {
    httpStatus: 400,
  },
} as const;
