import axios from "axios";

const api = axios.create({
  baseURL: "https://careerforge-ai-2-clz9.onrender.com/api",
});

export default api;