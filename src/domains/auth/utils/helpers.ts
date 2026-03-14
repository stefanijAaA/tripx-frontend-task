import { LoginErrorType } from '@/src/services';

export const isCountableFailure = (errorType: LoginErrorType) =>
  errorType === 'INVALID_CREDENTIALS' || errorType === 'SERVER_ERROR';
