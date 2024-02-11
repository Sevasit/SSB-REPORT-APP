"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import relativeTime from "dayjs/plugin/relativeTime";
import { ITaskSendPonit } from "@/types/ITask";
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Rating,
} from "@mui/material";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import useGetTaskComplete from "@/hooks/tasks/useGetTaskComplete";
import useSendPoint from "@/hooks/tasks/useSendPoint";
import { set } from "react-hook-form";
dayjs.locale("th");
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

type Props = {};

const Result = (props: Props) => {
  const { data: session, status } = useSession();
  const [idResult, setIdResult] = React.useState<string>("");
  const [openModal, setOpenModal] = React.useState(false);
  const [score, setScore] = React.useState<number>(0);
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);

  console.log(status);
  console.log("session", session);

  const {
    data: dataTaskComplete = [],
    isLoading: taskCompleteISLoading,
    isError: taskCompleteISError,
  } = useGetTaskComplete(session?.user.id!!);

  const {
    mutateAsync: mutateAsyncSendPoint,
    isLoading: sendPointISLoading,
    isError: sendPointISError,
  } = useSendPoint();

  const handleCloseSendPoint = () => {
    setOpenModal(false);
    setScore(0);
  };

  const submitScore = () => {
    setDisableSubmit(true);
    if (score === 0) {
      toast.error("กรุณาให้คะเเนนความพึงพอใจก่อนส่ง", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#dc8000",
        },
        iconTheme: {
          primary: "#dc8000",
          secondary: "#FFFAEE",
        },
      });
      setDisableSubmit(false);
      return;
    }
    const payload: ITaskSendPonit = {
      id: idResult,
      point: score,
    };
    mutateAsyncSendPoint(payload)
      .then((res) => {
        console.log(res.message);
        if (res.message === "Send point to task successfully") {
          toast.success("ให้คะเเนนความพึงพอใจสำเร็จ");
          setOpenModal(false);
          setScore(0);
          setDisableSubmit(false);
        } else {
          toast.error("ให้คะเเนนความพึงพอใจไม่สำเร็จ");
          setScore(0);
          setDisableSubmit(false);
        }
        setOpenModal(false);
      })
      .catch((err) => {
        setDisableSubmit(false);
        toast.error("ให้คะเเนนความพึงพอใจไม่สำเร็จ");
      });
  };

  const handleClickOpen = (id: string) => {
    console.log(id);
    setIdResult(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setScore(0);
  };
  return (
    <>
      <div className="px-[5%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <div>ให้คะเเนนความพึงพอใจ</div>
            <div className="flex flex-col justify-center items-center gap-3">
              <div className=" border-2 rounded-md border-slate-400 shadow-md pt-2 overflow-y-scroll h-[450px] w-[300px]">
                <div className="flex flex-col justify-center items-center gap-2">
                  {dataTaskComplete.length === 0 ? (
                    <div className="flex justify-center items-center h-[440px]">
                      <div>ไม่มีข้อมูลรายงานผล</div>
                    </div>
                  ) : (
                    dataTaskComplete.map((item, index) => (
                      <Card
                        sx={{ minWidth: 270, maxHeight: 500 }}
                        key={item._id}
                        className=" border"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <Image
                            width={170}
                            height={170}
                            src={item.imageEnd}
                            alt="image report"
                            className=" shadow-xl border-2 border-gray-200"
                          />
                        </div>
                        <CardContent>
                          <div>
                            <span className=" font-extrabold text-black text-sm">{`ประเภทปัญหา : `}</span>
                            <span className=" text-xs">
                              {item.type.typeName}
                            </span>
                          </div>
                          <div>
                            <span className=" font-extrabold text-black text-sm">{`อาคาร : `}</span>
                            <span className=" text-xs">
                              {item.building.nameBuilding}
                            </span>
                          </div>
                          <div className=" font-extrabold text-black text-sm">
                            รายละเอียดสถานที่
                          </div>
                          <div className=" break-all text-xs text-gray-500">
                            {item.location}
                          </div>

                          <div>
                            <span className=" font-extrabold text-black text-sm">{`สถานะ : `}</span>
                            <span
                              className={`${
                                item.status === "pending"
                                  ? " text-xs bg-gray-300 px-1 rounded-md"
                                  : item.status === "approve"
                                  ? "text-xs px-1 bg-[#dc8000] rounded-md"
                                  : "text-xs px-1 bg-[#00DC82] rounded-md"
                              }`}
                            >
                              {item.status === "pending"
                                ? "รอการยืนยัน"
                                : item.status === "approve"
                                ? "รอดำเนินการให้สำเร็จ"
                                : "เเก้ปัญหาสำเร็จ"}
                            </span>
                          </div>
                          <div>
                            <span className=" font-extrabold text-black text-sm">{`เวลาที่เเจ้ง : `}</span>
                            <span className=" text-xs">
                              {dayjs().to(
                                dayjs.unix(dayjs(item.createdAt).unix())
                              )}
                            </span>
                          </div>
                          <div>
                            <span className=" font-extrabold text-black text-sm">{`เวลาที่เเก้ปัญหาสำเร็จ : `}</span>
                            <span className=" text-xs">
                              {dayjs().to(
                                dayjs.unix(dayjs(item.processAt).unix())
                              )}
                            </span>
                          </div>
                          {item.point === 0 ? (
                            <button
                              type="button"
                              onClick={() => handleClickOpen(item._id)}
                              className=" text-xs mt-2 bg-[#00DC82] border-2 border-black text-white shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
                            >
                              ให้คะเเนนความพึงพอใจ
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled
                              className="cursor-not-allowed text-xs mt-2 bg-gray-300 border-2 border-[#0f8d67] text-black shadow-md rounded-lg flex gap-1 justify-center px-4 items-center"
                            >
                              ให้คะเเนนความพึงพอใจ
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
            <Link href="/">
              <div className=" text-sm w-24 bg-[#00DC82] border-2 border-black text-white shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center">
                <span>กลับสู่เมนู</span>
              </div>
            </Link>
          </div>
        </div>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent style={{ minWidth: 300 }}>
            <div>ให้คะเเนนความพึงพอใจ</div>
            <Rating
              name="simple-controlled"
              value={score}
              defaultValue={0}
              size="large"
              onChange={(event, newValue) => {
                console.log(newValue);
                setScore(newValue!!);
              }}
            />
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleCloseSendPoint}
                className=" mt-2 w-20 bg-[#b91515] border-2 border-black text-white shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
              >
                <span>ยกเลิก</span>
              </button>
              {disableSubmit ? (
                <button
                  type="button"
                  disabled
                  className=" mt-2 w-20 bg-gray-300 border-2 border-[#0f8d67] text-black shadow-md cursor-not-allowed rounded-lg flex gap-1 justify-center px-4 items-center"
                >
                  <span>ยืนยัน</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submitScore}
                  className=" mt-2 w-20 bg-[#00DC82] border-2 border-black text-white shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
                >
                  <span>ยืนยัน</span>
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Toaster position="bottom-right" />
      </div>
    </>
  );
};

export default Result;
