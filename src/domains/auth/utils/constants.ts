export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Incorrect username or password.',
  SERVER_ERROR: 'A server error occurred. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

export const LOGIN_ENDPOINT = '/api/login';
