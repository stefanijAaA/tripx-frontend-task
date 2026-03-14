export type LoginFormValues = {
  username: string;
  password: string;
  bookingCode?: string;
};

export type LoginRequestBody = {
  username: string;
  password: string;
  bookingCode?: string;
};

export type LoginSuccessResponse = {
  success: true;
};

export type LoginErrorType =
  | 'invalid_credentials'
  | 'server_error'
  | 'network_error';

export type LoginResult =
  | { success: true }
  | { success: false; errorType: LoginErrorType; message: string };
