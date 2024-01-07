import AxiosCustom from "@/app/utils/AxiosApi";
import { IBuilding } from "@/types/IBuilding";

export const getFindAllBuliding = async () => {
  try {
    const response = await AxiosCustom.get<IBuilding[]>(`/building`);
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};
