import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL:
  //   import.meta.env.MODE === "development"
  //     ? "http://localhost:5001/api"
  //     : "https://chat-backend-n62b.onrender.com/api",
  baseURL: "https://chat-backend-n62b.onrender.com/api",
  withCredentials: true,
});
