import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.10:8081",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    return {
      user: {_id: 1, status: "Active",  username: "Aristides", email: "adfasdf@sfasf.asf", confirmationCode: 123},
      token: "111"
    };
    const response = await api.post("/users/auth/refresh", { token });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    return {
      user: {_id: 1, status: "Active",  username: "Aristides", email: "adfasdf@sfasf.asf", confirmationCode: 123},
      token: "111"
    };
    
    /* const response = await api
      .post("/users/auth/login", { email, password })
      .catch((error: AxiosError) => {
        return error.response;
      });
    return response; */
  },

  signup: async (name: string, email: string, password: string) => {
    const response = await api
      .post("/users/new", {
        name,
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

  confirmCode: async (email: string, confirmCode: number) => {
    const response = await api
      .post("users/auth/confirmCode", { email, confirmCode })
      .catch((error: AxiosError) => {
        return error.response;
      });
    return response;
  },

  getCategory: async () => {
    const response = await api.get("/category");
    return response.data;
  },
  setEstablishment: async (formData: FormData) => {
    const response = await api.post("/est/post", { formData });
    return response;
  },
});
