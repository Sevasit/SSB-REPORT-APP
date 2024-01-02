"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import avatar from "../public/avatar.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Camera from "./components/Camera";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dataImage, setDataImage] = React.useState("");

  console.log(status);
  console.log("session", session);

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });

    if (data?.url) {
      router.push(data.url);
    }
  };

  return (
    <>
      <div className="px-[5%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div>การเเจ้งปัญหาภายในคณะบริหารธุรกิจ</div>
            <Image
              src={session === undefined ? avatar : session?.user.image!!}
              alt="Avatar Line"
              width={100}
              height={100}
              priority
              className="rounded-full shadow-md shadow-black"
            />
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <form
              className="flex flex-col gap-2 justify-center items-center"
              // onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="name"
                  variant="outlined"
                  size="small"
                  label="ชื่อปัญหา"
                  color="success"
                  // {...register("name", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {/* {errors.name &&
                        errors.name.type === "required" &&
                        "กรุณากรอกชื่อผู้ใช้"} */}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="name"
                  variant="outlined"
                  size="small"
                  label="รายละเอียดปัญหา"
                  color="success"
                  // {...register("name", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {/* {errors.name &&
                        errors.name.type === "required" &&
                        "กรุณากรอกชื่อผู้ใช้"} */}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="name"
                  variant="outlined"
                  size="small"
                  label="เบอร์โทรศัพท์ติดต่อ"
                  color="success"
                  // {...register("name", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {/* {errors.name &&
                        errors.name.type === "required" &&
                        "กรุณากรอกชื่อผู้ใช้"} */}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <InputLabel id="demo-simple-select-label" color="success">
                  ประเภทปัญหา
                </InputLabel>
                <Select
                  label="ประเภทปัญหา"
                  id="role"
                  // inputProps={{ ...register("role", { required: true }) }}
                  defaultValue={""}
                  color="success"
                >
                  {/* {dataType.map((item, index) => (
                      <MenuItem key={item._id} value={item.typeName}>
                        {item.typeName}
                      </MenuItem>
                    ))} */}
                </Select>
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {/* {errors.role &&
                      errors.role.type === "required" &&
                      "กรุณาเลือกประเภทงานผู้ใช้"} */}
                </p>
                <Camera dataImg={setDataImage} />
                <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
                  <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                    <span>ยกเลิก</span>
                  </div>
                  <button
                    type="submit"
                    className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center"
                  >
                    <span>ยืนยัน</span>
                  </button>
                </div>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
