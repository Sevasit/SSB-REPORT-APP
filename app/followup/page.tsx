"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { ITaskFindByUserId } from "../../types/ITask";
import { findAllByIdUser } from "../api/taskApi/task";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import relativeTime from "dayjs/plugin/relativeTime";
import imageTest from "../../public/avatar.png";
dayjs.locale("th");
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

type Props = {};

const Followup = (props: Props) => {
  const { data: session, status } = useSession();
  const [dataFind, setDataFind] = React.useState<ITaskFindByUserId[] | []>([]);
  console.log(status);
  console.log("session", session);

  React.useEffect(() => {
    findAllByIdUser(session?.user.id!!)
      .then((res) => {
        console.log("resresresresres", res);
        setDataFind(res);
      })
      .catch((err) => {
        setDataFind([]);
      });
  }, [session?.user.id!!]);

  function formatPhoneNumber(phoneNumber: string) {
    const formattedPhoneNumber = `${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    return formattedPhoneNumber;
  }
  return (
    <>
      <div className="px-[5%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <div>ติดตามผลรายงาน</div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className=" border-2 rounded-md border-slate-400 shadow-md pt-2 overflow-y-scroll h-[450px] w-[300px]">
            <div className="flex flex-col justify-center items-center gap-2">
              {dataFind.length === 0 ? (
                <div className="flex justify-center items-center h-[440px]">
                  <div>ไม่มีข้อมูลรายงานผล</div>
                </div>
              ) : (
                dataFind.map((item, index) => (
                  <Card
                    sx={{ minWidth: 300, maxHeight: 500 }}
                    key={item._id}
                    className=" border"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        width={170}
                        height={170}
                        src={session?.user.image!!}
                        alt="image report"
                        className=" shadow-xl border-2 border-gray-200"
                      />
                    </div>
                    <CardContent>
                      <div>
                        <span className=" font-extrabold text-black text-sm">{`ประเภทปัญหา : `}</span>
                        <span className=" text-xs">{item.type}</span>
                      </div>
                      <div className=" font-extrabold text-black text-sm">
                        รายละเอียดปัญหา
                      </div>
                      <div className=" break-all text-xs text-gray-500">
                        {item.remark}
                      </div>
                      <div>
                        <span className=" font-extrabold text-black text-sm">{`อาคาร : `}</span>
                        <span className=" text-xs">{item.building}</span>
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
                        <span className=" font-extrabold text-black text-sm">{`วันที่เเจ้ง : `}</span>
                        <span className=" text-xs">
                          {dayjs().to(dayjs.unix(dayjs(item.createdAt).unix()))}
                        </span>
                      </div>
                      <div>
                        <span className=" font-extrabold text-black text-sm">{`เบอร์โทร : `}</span>
                        <span className=" text-xs">
                          {formatPhoneNumber(item.phone)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
          <div>
            <Link href="/">
              <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                <span>ยกเลิก</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Followup;
