import { handleImageUpload } from 'src/app/api/image';
import { SupabaseClientType } from 'src/types/supabase';

import { molabApi } from './supabase';

export const editorImageHandler = ({
  supabase,
  fileName,
  successCallback,
  errorCallback,
}: {
  supabase: SupabaseClientType;
  fileName: string;
  successCallback?: (url: string) => void;
  errorCallback?: () => void;
}) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.addEventListener('change', async () => {
    if (input.files?.[0]) {
      const imageFile = input?.files[0];

      try {
        const imgUrl = await molabApi.molabApiHandleImageUpload(supabase)(
          'project_image',
          // encode file name to handle Korean
          fileName,
          imageFile
        );

        if (imgUrl && typeof successCallback === 'function') {
          return successCallback(
            `${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/project_image/${imgUrl}`
          );
        }
      } catch (error) {
        console.error(error);
        if (typeof errorCallback === 'function') {
          return errorCallback();
        }
      }
    }
  });
};
