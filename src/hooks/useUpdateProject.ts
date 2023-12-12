import { useMutation } from "@tanstack/react-query";
import type { ProjectFormValues } from "src/types/project";
import { enqueueSnackbar } from "notistack";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { molabApi } from "src/utils/supabase";

interface useUpdateProjectProps {
  projectId: string;
  refetch?: () => void;
}

const useUpdateProject = ({ projectId, refetch }: useUpdateProjectProps) => {
  const supabseClient = createClientComponentClient();

  return useMutation(
    async (formData: ProjectFormValues) =>
      await molabApi.molabApiUpdatePropse(supabseClient)(projectId, formData)
        .then((res) => {
          enqueueSnackbar("성공적으로 저장되었습니다.", {
            variant: "success",
          });

          if (typeof refetch === "function") {
            refetch();
          }
        })
        .catch((err) => {
          enqueueSnackbar("저장에 실패했습니다. 다시 시도해주세요", {
            variant: "error",
          });
        })
  );
};
export default useUpdateProject;
