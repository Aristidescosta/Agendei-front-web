import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.42.145:8081",
  headers: {
    "Content-type": "application/json"
  }
});

export const useApi = () => ({
  signUp: async (username: string, email: string, password: string) => {
    return await api.post("/users/signUp", { username, email, password })
  },

  confirmCode: async (email: string, confirmationCode: string) =>{
    return await api.post("/users/confirmCode", { email, confirmationCode });
  },

  reConfirmCode: async(email: string) => {
    return await api.post("/users/confirmCode/reset", { email });
  },

  login: async (email: string, password: string) => {
    return await api.post("/users/login", { email, password })
  },

  validateToken: async (token: string) => {
    return await api.post("/validateToken", { token });
  },

  getEstablishment: async () => {
    return await api.get("/user/establishment");
  }
});
