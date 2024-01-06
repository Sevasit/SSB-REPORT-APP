import { IResponseDefault } from "@/types/IResponseDefult";
import { ITaskCreate, ITaskFindByUserId } from "@/types/ITask";
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

export const findAllByIdUser = async (id: string) => {
  try {
    const response = await AxiosCustom.get<ITaskFindByUserId[]>(
      `/tasks/findAllByIdUser?userId=${id}`
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
