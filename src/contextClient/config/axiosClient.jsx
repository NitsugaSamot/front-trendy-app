import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.RAILWAY_BACKEND_URL}`,
});

export default axiosClient;
