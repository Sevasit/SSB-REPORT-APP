import { useQuery } from "@tanstack/react-query";
import { findAllByIdUserApi } from "@/app/api/taskApi/task";
import { ITaskFindByUserId } from "@/types/ITask";
import { findAllByIdUser } from "../QueriesKey";
const useGetTaskByUserId = (id: string) => {
  return useQuery<ITaskFindByUserId[], { message: string }>(
    [findAllByIdUser, id],
    async () => await findAllByIdUserApi(id)
  );
};

export default useGetTaskByUserId;
