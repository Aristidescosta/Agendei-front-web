import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { Email } from "../../types/Email";
import toast from "react-hot-toast";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [email, setEmail] = useState<Email | string>();
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  useEffect(() => {
    const validateToken = async () => {
      const storageDate = localStorage.getItem("authToken");
      if (storageDate) {
        const response = await api.validateToken(storageDate);
        if (response.token) {
          setUser(response.dataUser);
          setToken(response.token);
        }
      }
    };
    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const response = await api.signin(email, password);
    if (response?.status === 200) {
      setUser(response.data.user);
      setToken(response.data.token);
    }
    if (response?.status === 422) {
      toast.error(response.data.message);
    }
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  const signout = async () => {
    await api.logout();
    setUser(null);
    localStorage.clear();
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await api.signup(username, email, password);
    if (response?.status === 422) {
      toast.error(response.data.message.toUpperCase());
      return false;
    }
    return true;
  };

  const getEstablishment = async (id: number) => {
    if (user?._id) {
      await api.getEstablishment(id);
      return true;
    }
    return false;
  };

  const getCategory = async () => {
    await api.getCategory();
  };

  const setEstablishment = async (formData: FormData) => {
    await api
      .setEstablishment(formData)
      .then((response) => {
        if (!response.data.ok)
          throw new Error("não foi possível completar cadastro");

        return response.data.text();
      })
      .then((data) => alert(data));
    return false;
  };

  const confirmCode = async (email: string, code: number) => {
    const response = await api.confirmCode(email, code);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        setUser,
        setEmail,
        signin,
        signout,
        confirmCode,
        getEstablishment,
        getCategory,
        setEstablishment,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
