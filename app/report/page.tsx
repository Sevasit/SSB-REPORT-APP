"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import avatar from "../../public/avatar.png";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { set, useForm } from "react-hook-form";
import { IType } from "@/types/IType";
import toast, { Toaster } from "react-hot-toast";
import { getfindTypesApi } from "../api/type/typeApi";
import { ITaskCreate } from "../types/ITask";
import { createTaskApi } from "../api/taskApi/task";
import Camera from "../components/Camera";
import Link from "next/link";

type FormData = {
  title: string;
  phone: string;
  remark: string;
  type: string;
};

export default function Report() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dataImage, setDataImage] = React.useState("");
  const [dataType, setDataType] = React.useState<IType[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getfindTypesApi();
      setDataType(result);
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  console.log(status);
  console.log("session", session);

  const handleUpload = async (data: FormData) => {
    if (!dataImage) {
      toast.error("กรุณาถ่ายภาพปัญหาก่อนเเจ้ง", {
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
      return;
    }
    const formData = new FormData();
    formData.append("file", dataImage);
    formData.append("upload_preset", "reportImg");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_URL!!,
        formData
      );
      const url = response.data.secure_url;
      console.log(url);
      if (!url) {
        return;
      }
      const payload: ITaskCreate = {
        userId: session?.user.id!!,
        name: session?.user.name!!,
        phone: data.phone,
        title: data.title,
        remark: data.remark,
        type: data.type,
        imageStart: url,
      };
      const res = createTaskApi(payload);
      res
        .then((res) => {
          if (res.message === "Created task successfully") {
            toast.success("เเจ้งปัญหาสำเร็จ");
          } else {
            toast.error("เเจ้งปัญหาไม่สำเร็จ", {
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
          }
        })
        .catch((err) => {
          toast.error("เเจ้งปัญหาไม่สำเร็จ", {
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
        });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <>
      <div className="px-[5%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            {/* <div>การเเจ้งปัญหาภายในคณะบริหารธุรกิจ</div>
            <Image
              src={session === undefined ? avatar : session?.user.image!!}
              alt="Avatar Line"
              width={100}
              height={100}
              priority
              className="rounded-full shadow-md shadow-black"
            /> */}
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <form
              className="flex flex-col gap-2 justify-center items-center"
              onSubmit={handleSubmit(handleUpload)}
            >
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="title"
                  variant="outlined"
                  size="small"
                  label="ชื่อปัญหา"
                  color="success"
                  {...register("title", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.title &&
                    errors.title.type === "required" &&
                    "กรุณากรอกชื่อปัญหา"}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="remark"
                  variant="outlined"
                  size="small"
                  label="รายละเอียดปัญหา"
                  color="success"
                  {...register("remark", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.remark &&
                    errors.remark.type === "required" &&
                    "กรุณากรอกรายละเอียดปัญหา"}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="phone"
                  variant="outlined"
                  size="small"
                  label="เบอร์โทรศัพท์"
                  color="success"
                  {...register("phone", {
                    required: true,
                    pattern: {
                      value: /^(06|08|09)\d{8}$/,
                      message: "กรุณากรอกเบอร์โทรศัพท์ผู้ใช้ให้ถูกต้อง",
                    },
                  })}
                  inputProps={{
                    maxLength: 10,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                      event.target.value = event.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    },
                  }}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.phone &&
                    errors.phone.type === "required" &&
                    "กรุณากรอกเบอร์โทรศัพท์ผู้ใช้"}
                  {errors.phone &&
                    errors.phone.type === "pattern" &&
                    errors.phone.message}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <InputLabel id="demo-simple-select-label" color="success">
                  ประเภทปัญหา
                </InputLabel>
                <Select
                  label="ประเภทปัญหา"
                  id="role"
                  inputProps={{ ...register("type", { required: true }) }}
                  defaultValue={""}
                  color="success"
                >
                  {dataType.map((item, index) => (
                    <MenuItem key={item._id} value={item.typeName}>
                      {item.typeName}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.type &&
                    errors.type.type === "required" &&
                    "กรุณาเลือกประเภทปัญหา"}
                </p>
                <Camera dataImg={setDataImage} />
                <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
                  <Link href="/">
                    <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                      <span>ยกเลิก</span>
                    </div>
                  </Link>
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
      <Toaster position="bottom-right" />
    </>
  );
}
