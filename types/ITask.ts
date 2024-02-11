import { Dayjs } from "dayjs";

export interface ITaskCreate {
  userId: string;
  name: string;
  phone: string;
  remark: string;
  building: string;
  location: string;
  type: string;
  imageStart: string;
}

export interface ITaskFindByUserId {
  _id: string;
  phone: string;
  remark: string;
  type: {
    typeName: string;
  };
  status: string;
  building: {
    nameBuilding: string;
  };
  location: string;
  imageStart: string;
  createdAt: Dayjs;
}

export interface ITaskFindByUserIdCompleted {
  _id: string;
  imageEnd: string;
  type: {
    typeName: string;
  };
  status: string;
  building: {
    nameBuilding: string;
  };
  location: string;
  processAt: Dayjs;
  createdAt: Dayjs;
  point: number;
}

export interface ITaskSendPonit {
  id: string;
  point: number;
}
