import axios from "axios";

const api = axios.create({
  baseURL: "https://teste-api-api.herokuapp.com",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/users/auth/login", { token });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await api.post("/users/auth/login", { email, password });
    console.log(response.data)
    return response.data;
  },

  logout: async () => {
    return { status: true };
    const response = await api.post("/logout");
    return response.data;
  },
});
