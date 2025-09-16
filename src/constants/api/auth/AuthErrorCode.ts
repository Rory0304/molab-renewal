export const AuthErrorCode = {
  ErrorCodeEmailExists: 'email_exists',
  ErrorCodeEmailNotConfirmed: 'email_not_confirmed',
  ErrorCodeInvalidLoginCredentials: 'invalid_login_credentials',
  ErrorCodeUnknown: 'unknown',
} as const;

export type AuthErrorCodeType =
  (typeof AuthErrorCode)[keyof typeof AuthErrorCode];
