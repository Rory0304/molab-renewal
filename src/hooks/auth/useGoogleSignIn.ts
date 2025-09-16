import { SupabaseClientSingleton } from 'src/supabase/SupabaseClientSingleton';

export const useGoogleSignIn = () => {
  const supabase = SupabaseClientSingleton.getClient();

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  return {
    handleSignInWithGoogle,
  };
};
