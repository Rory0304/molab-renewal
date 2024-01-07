'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useBeforeUnload } from 'react-use';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { RecoilRoot } from 'recoil';
import { PROJECT_FORM_DEFAULT_VALUES } from 'src/constants/projectFormDefaultValues';
import { useAuth } from 'src/context/AuthProvider';
import type { ProjectFormValues } from 'src/types';
import { convertImageUrltoFile } from 'src/utils/file';
import { molabApi } from 'src/utils/supabase';

interface ProjectProviderProps {
  children: React.ReactNode;
}

const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const supabaseClient = createClientComponentClient();

  const { userInfo } = useAuth();

  const projectId = params['slug'][0];

  //
  //
  //
  const { data, isFetching, refetch } = useQuery(
    ['project', projectId, userInfo],
    async () => {
      return await molabApi
        .molabApiFetchProposeById(supabaseClient)(projectId)
        .then(res => res.data)
        .catch(err => {
          enqueueSnackbar('프로젝트를 불러올 수 없습니다', {
            variant: 'error',
          });
          router.push('/myproject');

          throw new Error();
        });
    },
    {
      enabled: Boolean(projectId && userInfo?.id),
      refetchOnMount: false,
    }
  );

  //
  //
  //
  const methods = useForm<ProjectFormValues>({
    mode: 'all',
    defaultValues: {
      payload: PROJECT_FORM_DEFAULT_VALUES.payload,
      isFetching: false,
      refetch: refetch,
    },
  });

  //
  // when form data not saved and tab is closed,
  // show default window dialog
  //
  useBeforeUnload(
    methods.formState.isDirty,
    'You have unsaved changes, are you sure?'
  );

  //
  //
  //
  React.useEffect(() => {
    const initializeFormData = async () => {
      if (data) {
        // If thumbnail url exist, then convert to `FileList` type
        const thumbnailFileList = new DataTransfer();

        if (data.thumbnail) {
          await convertImageUrltoFile(
            `${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${data.thumbnail}`
          ).then(res => {
            if (res) {
              thumbnailFileList.items.add(res);
            }
          });
        }

        // Reset form default value with fetched project data
        const configuredFormData = {
          payload: {
            uuid: data.uuid || projectId,
            title: data.title || PROJECT_FORM_DEFAULT_VALUES.payload.title,
            thumbnail: thumbnailFileList.files,
            siDo: data.siDo || PROJECT_FORM_DEFAULT_VALUES.payload.siDo,
            siGunGu:
              data.siGunGu || PROJECT_FORM_DEFAULT_VALUES.payload.siGunGu,
            isOpen: data.isOpen,
            howTo: data.howTo || PROJECT_FORM_DEFAULT_VALUES.payload.howTo,
            stepDetail:
              data.stepDetail || PROJECT_FORM_DEFAULT_VALUES.payload.stepDetail,
            startDate:
              data.startDate || PROJECT_FORM_DEFAULT_VALUES.payload.startDate,
            endDate:
              data.endDate || PROJECT_FORM_DEFAULT_VALUES.payload.endDate,
          },
        } as ProjectFormValues;

        methods.reset({
          payload: configuredFormData.payload,
          refetch: refetch,
          isFetching: false,
        });
      }
    };

    initializeFormData();
  }, [data]);

  React.useEffect(() => {
    methods.setValue('isFetching', isFetching, { shouldDirty: true });
  }, [isFetching]);

  return (
    <RecoilRoot>
      <FormProvider {...methods}>{children}</FormProvider>
    </RecoilRoot>
  );
};

export default ProjectProvider;
