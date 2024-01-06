"use client";
import { useSession } from "next-auth/react";
import avatar from "../public/avatar.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TbLicense } from "react-icons/tb";
import { TbStars } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div className="px-[3%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className=" text-center">
              การเเจ้งปัญหาภายในคณะบริหารธุรกิจ
            </div>
            <Image
              src={session === undefined ? avatar : session?.user.image!!}
              alt="Avatar Line"
              width={100}
              height={100}
              priority
              className="rounded-full mt-5 shadow-md shadow-black"
            />
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <div className="flex flex-col gap-10">
              <Link href="/report">
                <div className=" w-56 h-28 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex flex-col gap-2 justify-center px-4 items-center">
                  <div className=" text-4xl">
                    <TbLicense />
                  </div>
                  <p>รายงานปัญหา</p>
                </div>
              </Link>
              <Link href="/followup">
                <div className="  w-56 h-28 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex flex-col gap-2 justify-center px-4 items-center">
                  <div className=" text-3xl">
                    <FaClockRotateLeft />
                  </div>
                  <p>ติดตามผลรายงาน</p>
                </div>
              </Link>
              <Link href="/result">
                <div className="  w-56 h-28 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex flex-col gap-2 justify-center px-4 items-center">
                  <div className=" text-4xl">
                    <TbStars />
                  </div>
                  <p>ให้คะเเนนความพึงพอใจ</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
