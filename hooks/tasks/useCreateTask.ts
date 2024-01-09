import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { createTask, findAllByIdUser } from "../QueriesKey";
import { createTaskApi } from "@/app/api/taskApi/task";

export default function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [createTask],
    (payload) => createTaskApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([findAllByIdUser]),
    }
  );
}
