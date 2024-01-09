import axios from "axios";
// import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_ENDPOINT_URL_PROD;

const AxiosCustom = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Axios.defaults.baseURL = "http://localhost:3333";
// AxiosCustom.defaults.baseURL = process.env.ENDPOINT_URL_DEV;
// AxiosCustom.interceptors.request.use(async (request) => {
//   const session = await getSession();
//   if (session) {
//     request.headers.Authorization = `Bearer ${session.jwt}`;
//   }

//   return request;
// });

export default AxiosCustom;
