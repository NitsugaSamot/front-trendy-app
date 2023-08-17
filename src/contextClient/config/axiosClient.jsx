import axios from "axios";

console.log(import.meta.env.RAILWAY_BACKEND_URL);
const axiosClient = axios.create({
  baseURL: `${import.meta.env.RAILWAY_BACKEND_URL}`,
});

export default axiosClient;
