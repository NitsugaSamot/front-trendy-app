require("dotenv").config();
const { RAILWAY_BACKEND_URL, VITE_BACKEND_URL } = process.env;
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${
    RAILWAY_BACKEND_URL || VITE_BACKEND_URL
  }`,
});
// console.log(import.meta.env.);

export default axiosClient;
