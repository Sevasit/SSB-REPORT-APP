import { useQuery } from "@tanstack/react-query";
import { getType } from "../QueriesKey";
import { getfindTypesApi } from "@/app/api/typeApi/typeApi";
import { IType } from "@/types/IType";
const useGetType = () => {
  return useQuery<IType[], { message: string }>(
    [getType],
    async () => await getfindTypesApi()
  );
};

export default useGetType;
