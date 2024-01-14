/**
 * Ref: https://github.com/supabase/gotrue/issues/915
 * As supabase dose not define sepecific error code to AuthApiError,
 * need to make this map manually
 */
export type AuthErrorCodeType =
  | 'SameWithPrevPassword'
  | 'AuthSessionMissingError'
  | 'EmailRateExceed'
  | 'EmailRequestOverload';

export const SUPABASE_AUTH_ERROR_CODE: Record<string, AuthErrorCodeType> = {
  ['New password should be different from the old password.']:
    'SameWithPrevPassword',
  ['Auth session missing']: 'AuthSessionMissingError',
  ['For security purposes, you can only request this once every 60 seconds']:
    'EmailRequestOverload',
  ['Email rate limit exceeded']: 'EmailRateExceed',
};

export const SUPABASE_AUTH_ERROR_MESSAGE: Record<AuthErrorCodeType, string> = {
  ['AuthSessionMissingError']:
    '비밀번호 재설정 요청이 만료되었습니다. 다시 시도하세요.',
  ['SameWithPrevPassword']:
    '새로운 비밀번호는 이전과 다른 비밀번호로 설정해야 합니다.',
  ['EmailRateExceed']: '문제가 발생했습니다. 잠시후 다시 시도해주세요.',
  ['EmailRequestOverload']:
    '60초에 한 번만 요청할 수 있습니다. 잠시 후 다시 시도해 주세요.',
};
