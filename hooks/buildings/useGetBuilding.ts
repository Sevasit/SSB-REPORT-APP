import { useQuery } from "@tanstack/react-query";
import { getBuilding } from "../QueriesKey";
import { getFindAllBuliding } from "@/app/api/buildingApi/building";
import { IBuilding } from "@/types/IBuilding";
const useGetBuilding = () => {
  return useQuery<IBuilding[], { message: string }>(
    [getBuilding],
    async () => await getFindAllBuliding()
  );
};

export default useGetBuilding;
