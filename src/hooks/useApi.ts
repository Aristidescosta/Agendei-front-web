import axios, { AxiosError, AxiosPromise, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.227:3005",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/users/auth/refresh", { token });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await api
      .post("/users/auth/login", { email, password })
      .catch((error: AxiosError) => {
        return error.response;
      });
    return response;
  },

  signup: async (username: string, email: string, password: string) => {
    const response = await api
      .post("/users/signup", {
        username,
        email,
        password,
      })
      .catch((error: AxiosError) => {
        return error.response;
      });
    return response;
  },

  logout: async () => {
    return { status: true };
  },

  getEstablishment: async (id: number) => {
    const response = await api.get(`/est/estsuser/${id}`);
    return response.data;
  },

  confirmCode: async (email: string, code: number) => {
    const response = await api.post("/users/auth/confirmcode", { email, code });
    return response;
  },

  getCategory: async () => {
    const response = await api.get("/category");
    return response.data;
  },
  setEstablishment: async (formData: FormData) => {
    const response = await api.post("/est/post", { formData });
    return response
  },
});
