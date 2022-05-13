import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:3005",
  headers: {
    "Content-type": "application/json",
  },
});

export const useApi = () => ({
  signUp: async (username: string, email: string, password: string) => {
    return await api.post("/users/signUp", { username, email, password });
  },

  confirmCode: async (email: string, confirmationCode: string) => {
    return await api.post("/users/confirmCode", { email, confirmationCode });
  },

  reConfirmCode: async (email: string) => {
    return await api.post("/users/confirmCode/reset", { email });
  },

  login: async (email: string, password: string) => {
    return await api.post("/users/login", { email, password });
  },

  validateToken: async (token: string) => {
    return await api.post("/users/validateToken", { token });
  },

  getEstablishment: async (userId: string) => {
    return await api.get(`/users/establishment/${userId}`);
  },

  getOneEstablishment: async (id: string) => {
    return await api.post("/est/get", { id });
  },

  getCategory: async () => {
    return await api.get("/category");
  },

  setEstablishment: async (formData: FormData) => {
    return await api.post("/est/post", { formData });
  },

  deleteEstablishment: async (id: string) => {
    return await api.post("/est/delete", { id })
  }
});
