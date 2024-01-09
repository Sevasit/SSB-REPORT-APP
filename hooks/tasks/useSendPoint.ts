import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IResponseDefault } from "../../types/IResponseDefult";
import { findCompletedByIdUser, sendPointTask } from "../QueriesKey";
import { sendPointTaskApi } from "@/app/api/taskApi/task";

export default function useSendPoint() {
  const queryClient = useQueryClient();
  return useMutation<IResponseDefault, { message: string }, any>(
    [sendPointTask],
    (payload) => sendPointTaskApi(payload),
    {
      onSuccess: () => queryClient.invalidateQueries([findCompletedByIdUser]),
    }
  );
}
