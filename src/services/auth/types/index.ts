export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginServiceError = {
  errorType: LoginErrorType;
  message: string;
};

export type LoginErrorType =
  | 'INVALID_CREDENTIALS'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';
