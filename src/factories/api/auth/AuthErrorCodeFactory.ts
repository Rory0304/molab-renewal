import { AuthError } from '@supabase/supabase-js';
import {
  AuthErrorCode,
  AuthErrorCodeType,
} from 'src/constants/api/auth/AuthErrorCode';

export namespace AuthErrorCodeFactory {
  /**
   * supabase-js 에서는 code 를 전달하지 않기 떄문에, message string 을 통해 에러 코드를 변환합니다.
   * ref: https://github.com/supabase/auth/issues/1631
   */
  export const convertErrorCode = (
    message: AuthError['message']
  ): AuthErrorCodeType => {
    if (message === 'Invalid login credentials') {
      return AuthErrorCode.ErrorCodeInvalidLoginCredentials;
    }

    if (message === 'Email not confirmed') {
      return AuthErrorCode.ErrorCodeEmailNotConfirmed;
    }

    return AuthErrorCode.ErrorCodeUnknown;
  };
}
