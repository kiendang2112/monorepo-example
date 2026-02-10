import axios from "axios";
import { env } from "@/env";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
