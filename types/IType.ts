import { Dayjs } from "dayjs";

export interface IType {
  _id: string;
  typeName: string;
  typeCode: string;
  createdAt: Dayjs;
}
