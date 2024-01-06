import { Dayjs } from "dayjs";

export interface ITaskCreate {
  userId: string;
  name: string;
  phone: string;
  remark: string;
  type: string;
  imageStart: string;
}

export interface ITaskFindByUserId {
  _id: string;
  phone: string;
  remark: string;
  type: string;
  status: string;
  imageStart: string;
  createdAt: Dayjs;
}
