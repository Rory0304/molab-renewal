"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "src/context/auth-context";
import { convertImageUrltoFile } from "src/utils/file";
import { fetchProposeById } from "src/app/api/propose";
import type { ProjectFormValues } from "src/types";
import { PROJECT_FORM_DEFAULT_VALUES } from "src/constants/projectFormDefaultValues";

interface ProposeFormProviderProps {
  children: React.ReactNode;
}

const ProposeFormProvider: React.FC<ProposeFormProviderProps> = ({
  children,
}) => {
  const { userInfo } = useAuth();

  const router = useRouter();
  const params = useParams();
  const projecetId = params.id ?? "";

  const methods = useForm<ProjectFormValues>({
    mode: "all",
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
  });

  React.useEffect(() => {
    if (!!projecetId && userInfo) {
      const setProjectData = async () => {
        try {
          const data = await fetchProposeById(projecetId, userInfo.id).then(
            (res) => res.data
          );

          // If thumbnail url exist, then convert to `FileList` type
          const thumbnailFileList = new FileList();
          if (data.thumbnail) {
            await convertImageUrltoFile(data.thumbnail).then((res) => {
              if (res) thumbnailFileList[0] = res;
            });
          }

          // Reset form default value with fetched project data
          const configuredFormData = {
            payload: {
              uuid: data.uuid,
              title: data.title,
              thumbnail: thumbnailFileList,
              siDo: data.siDo || "",
              siGunGu: data.siGunGu || "",
              isOpen: data.isOpen,
              howTo: data.howTo
                ? JSON.parse(data.howTo as string)
                : PROJECT_FORM_DEFAULT_VALUES.payload.howTo,
              stepDetail: data.stepDetail
                ? JSON.parse(data.stepDetail as string)
                : PROJECT_FORM_DEFAULT_VALUES.payload.stepDetail,
            },
          };

          methods.reset({
            ...configuredFormData,
          });

          setProjectData();
        } catch (_) {
          // show tooltip
          // router push to my project page
          router.push("/myproject");
        }
      };
    } else {
      router.push("/myproject");
    }
  }, [projecetId]);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default ProposeFormProvider;
