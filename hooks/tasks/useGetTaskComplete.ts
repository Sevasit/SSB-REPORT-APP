import { useQuery } from "@tanstack/react-query";
import { findCompletedByIdUser } from "../QueriesKey";
import { findCompletedByIdUserApi } from "@/app/api/taskApi/task";
import { ITaskFindByUserIdCompleted } from "@/types/ITask";
const useGetTaskComplete = (id: string) => {
  return useQuery<ITaskFindByUserIdCompleted[], { message: string }>(
    [findCompletedByIdUser, id],
    async () => await findCompletedByIdUserApi(id)
  );
};

export default useGetTaskComplete;
