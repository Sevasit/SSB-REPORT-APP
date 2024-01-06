import Link from "next/link";
import React from "react";
import notfoundlogo from "../public/notfoundlogo.png";
import Image from "next/image";
interface Props {}

const NotFound = (props: Props) => {
  return (
    <div className=" text-center pt-[5%] flex flex-col gap-5 items-center">
      <Image
        width={400}
        height={400}
        priority={true}
        src={notfoundlogo}
        alt="notfoundlogo"
      />
      <h2 className=" text-2xl text-[#00DC82] uppercase font-bold">
        404 not found
      </h2>
      <p className=" text-sm text-slate-400">
        สาเหตุ : Patch หรือ Param ของ Website ไม่ถูกต้องกรุณาไปที่หน้าหลัก
      </p>
      <Link href="/" className="flex justify-center items-center">
        <div className=" w-32 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer p-1 rounded-lg ">
          <div>กลับสู่หน้าหลัก</div>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
