export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginErrorType =
  | 'INVALID_CREDENTIALS'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export type LoginResult =
  | {
      success: true;
    }
  | {
      success: false;
      errorType: LoginErrorType;
      message: string;
    };
