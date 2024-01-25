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
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ITaskCreate } from "../../types/ITask";
import Camera from "../components/Camera";
import Link from "next/link";
import useGetType from "@/hooks/type/useGetType";
import useGetBuilding from "@/hooks/buildings/useGetBuilding";
import useCreateTask from "@/hooks/tasks/useCreateTask";

type FormData = {
  phone: string;
  remark: string;
  building: string;
  location: string;
  type: string;
};

export default function Report() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dataImage, setDataImage] = React.useState("");
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);

  const {
    data: dataTypes = [],
    isLoading: getISLoading,
    isError: getISError,
  } = useGetType();

  const {
    data: dataBuilding = [],
    isLoading: buildingISLoading,
    isError: buildingISError,
  } = useGetBuilding();

  const {
    mutateAsync: mutateAsyncCreateTask,
    isLoading: createTaskISLoading,
    isError: createTaskISError,
  } = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  console.log(status);
  console.log("session", session);

  const handleUpload = async (data: FormData) => {
    setDisableSubmit(true);
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
        building: data.building,
        location: data.location,
        phone: data.phone,
        remark: data.remark,
        type: data.type,
        imageStart: url,
      };
      const res = mutateAsyncCreateTask(payload);
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
          setDisableSubmit(false);
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
          setDisableSubmit(false);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setDisableSubmit(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <>
      <div className="px-[5%] mx-5 mt-5 flex flex-col gap-4 p-5 rounded-lg border-4 border-[#00DC82]">
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div>ชื่อผู้ใช้ : {session?.user.name}</div>
            <form
              className="flex flex-col gap-2 justify-center items-center"
              onSubmit={handleSubmit(handleUpload)}
            >
              <Camera dataImg={setDataImage} />
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
                  {dataTypes.map((item, index) => (
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
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="remark"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
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
                <InputLabel id="demo-simple-select-label" color="success">
                  อาคาร
                </InputLabel>
                <Select
                  label="อาคาร"
                  id="building"
                  inputProps={{ ...register("building", { required: true }) }}
                  defaultValue={""}
                  color="success"
                >
                  {dataBuilding.map((item, index) => (
                    <MenuItem key={item._id} value={item.nameBuilding}>
                      {item.nameBuilding}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.building &&
                    errors.building.type === "required" &&
                    "กรุณาเลือกอาคาร"}
                </p>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 300, minHeight: 60 }}>
                <TextField
                  id="location"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  label="รายละเอียดสถานที่"
                  color="success"
                  {...register("location", { required: true })}
                />
                <p className="text-[12px] ml-1 text-[#b91515]">
                  {errors.location &&
                    errors.location.type === "required" &&
                    "กรุณากรอกรายละเอียดสถานที่"}
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

              <div className="flex gap-10 items-start md:justify-end justify-center md:items-center mt-5">
                <Link href="/">
                  <div className=" w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#b91515] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center">
                    <span>ยกเลิก</span>
                  </div>
                </Link>
                <button
                  type="submit"
                  className={`${
                    disableSubmit ? "cursor-not-allowed" : ""
                  }w-20 bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-between px-4 items-center`}
                >
                  <span>ยืนยัน</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}
