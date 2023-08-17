import axios from "axios";
const RAILWAY_BACKEND_URL = import.meta.env.RAILWAY_BACKEND_URL;
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosClient = axios.create({
  baseURL: `${RAILWAY_BACKEND_URL || VITE_BACKEND_URL}`,
});
// console.log(import.meta.env.);

export default axiosClient;
