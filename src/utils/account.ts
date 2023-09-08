import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};
