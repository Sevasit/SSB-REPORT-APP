import { IResponseDefault } from "@/app/types/IResponseDefult";
import { ITaskCreate } from "@/app/types/ITask";
import AxiosCustom from "@/app/utils/AxiosApi";

export const createTaskApi = async (payload: ITaskCreate) => {
  try {
    const response = await AxiosCustom.post<IResponseDefault>(
      `/tasks/create`,
      payload
    );
    if (response?.data === undefined) {
      throw "error undefined";
    }
    return response?.data;
  } catch (err) {
    console.error(err);
    throw Promise.reject(err);
  }
};
