import axios from "axios";

const api = axios.create({
  baseURL: "https://teste-api-api.herokuapp.com",
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
    const response = await api.post("/logout");
    return response.data;
  },

  getEstablishment: async (id: number) => {
    const response = await api.get(`/est/estsuser/${id}`);
    return response.data;
  },

  getCategory: async () => {
    const response = await api.get("/category");
    return response.data;
  },
  setEstablishment: async (
    name: string,
    nif: string,
    categoryId: string,
    userId: string,
    address: object,
    phone_number: number,
    open_to: object
  ) => {
    const response = await api.post("/est/post", {
      name,
      nif,
      categoryId,
      userId,
      address,
      phone_number,
      open_to,
    });
    return response.data;
  },
});
