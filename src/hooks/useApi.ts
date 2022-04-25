import axios from "axios";

const api = axios.create({
  baseURL:"https://teste-api-api.herokuapp.com",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/users/auth/refresh", { token });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    try {
      const response = await api.post("/users/auth/login", { email, password });
      return response;
    } catch (error) {
      var texto = "erro: " + error
      return texto;
    }
  },

  signup: async (username: string, email: string, password: string) => {
    const response = await api.post("/users/signup", {
      username,
      email,
      password,
    });
    return response.statusText;
  },

  logout: async () => {
    return { status: true };
  },

  getEstablishment: async (id: number) => {
    const response = await api.get(`/est/estsuser/${id}`);
    return response.data;
  },

  getCategory: async () => {
    const response = await api.get("/category");
    return response.data;
  },
  setEstablishment: async (formData: FormData) => {
    const response = await api.post("/est/post", {formData});
    return response.data;
  },
});
