import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${
    import.meta.env.VITE_BACKEND_URL || import.meta.env.RAILWAY_BACKEND_URL
  }`,
});
// console.log(import.meta.env.VITE_BACKEND_URL);

export default axiosClient;