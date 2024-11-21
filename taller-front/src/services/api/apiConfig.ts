import axios from "axios";

// Crea una instancia de Axios configurada
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("No autorizado");
    }
    return Promise.reject(error);
  }
);

export default api;
