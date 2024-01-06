"use client";
import React from "react";
import Webcam from "react-webcam";
import { useState, useRef } from "react";
import Image from "next/image";

type Props = {
  dataImg: (img: string) => void;
};

const Camera = (props: Props) => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const videoConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
  };
  const [isCameraActive, setIsCameraActive] = useState(true);
  const handleClick = () => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIsCameraActive(false);
      setImgSrc(imageSrc);
      props.dataImg(imageSrc);
    }
  };
  return (
    <>
      <div className=" flex flex-col justify-center p-3">
        <span className="mb-2">ถ่ายรูปปัญหาของคุณ :</span>
        <div className="flex flex-row justify-center ">
          {isCameraActive === true ? (
            <Webcam
              className="rounded-2xl drop-shadow-xl"
              audio={false}
              width={250}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                ...videoConstraints,
                facingMode,
              }}
            />
          ) : (
            imgSrc !== null && (
              <div className="mt-3 rounded-xl">
                <Image width={250} height={250} src={imgSrc} alt="Picture" />
              </div>
            )
          )}
        </div>
        <div className="flex gap-10 justify-between items-center mt-5">
          {imgSrc === null ? (
            <button
              type="button"
              className=" w-20 text-xs bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
              onClick={capture}
            >
              ถ่ายรูป
            </button>
          ) : (
            <button
              type="button"
              className=" w-24 text-xs bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
              onClick={() => {
                setIsCameraActive(true);
                setImgSrc(null);
              }}
            >
              ถ่ายรูปใหม่
            </button>
          )}
          <button
            type="button"
            onClick={handleClick}
            className=" w-24 text-xs bg-white border-2 border-[#0f8d67] text-[#0f8d67] hover:bg-[#00DC82] hover:border-black hover:text-white duration-300 shadow-md cursor-pointer rounded-lg flex gap-1 justify-center px-4 items-center"
          >
            <span>สลับกล้อง</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Camera;
