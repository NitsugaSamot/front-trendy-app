import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.REACT_APP_RAILWAY_BACKEND_URL}`,
});

export default axiosClient;

