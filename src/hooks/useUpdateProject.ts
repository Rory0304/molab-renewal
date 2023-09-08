import { useMutation } from "@tanstack/react-query";
import { updatePropse } from "src/app/api/propose";
import type { ProjectFormValues } from "src/types/project";
import { enqueueSnackbar } from "notistack";

interface useUpdateProjectProps {
  projectId: string;
  refetch: () => void;
}

const useUpdateProject = ({
  projectId,
  refetch,
}: useUpdateProjectProps) => {
  return useMutation(
    async (formData: ProjectFormValues) =>
      await updatePropse(projectId, formData)
        .then((res) => {
          enqueueSnackbar("성공적으로 저장되었습니다.", {
            variant: "success",
          });
          refetch();
        })
        .catch((err) => {
          enqueueSnackbar("저장에 실패했습니다. 다시 시도해주세요", {
            variant: "error",
          });
        })
  );
};
export default useUpdateProject;
