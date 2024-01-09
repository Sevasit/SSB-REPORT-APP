import { IResponseDefault } from "@/types/IResponseDefult";
import {
  ITaskCreate,
  ITaskFindByUserId,
  ITaskFindByUserIdCompleted,
  ITaskSendPonit,
} from "@/types/ITask";
import AxiosCustom from "@/app/utils/AxiosApi";
import axios from "axios";

export const createTaskApi = async (payload: ITaskCreate) => {
  try {
    const response = await axios.post<IResponseDefault>(
      `${process.env.NEXT_PUBLIC_ENDPOINT_URL_PROD}/tasks/create`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
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

export const sendPointTaskApi = async (payload: ITaskSendPonit) => {
  try {
    const response = await AxiosCustom.patch<IResponseDefault>(
      `/tasks/sendPoint`,
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

export const findAllByIdUserApi = async (id: string) => {
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

export const findCompletedByIdUserApi = async (id: string) => {
  try {
    const response = await AxiosCustom.get<ITaskFindByUserIdCompleted[]>(
      `/tasks/findCompleteByIdUser?userId=${id}`
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
