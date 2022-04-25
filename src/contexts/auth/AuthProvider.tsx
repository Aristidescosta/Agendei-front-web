import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
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
    if (typeof response === "string") {
      return false;
    } else {
      setUser(response.data.user);
      setToken(response.data.token);
    }
    return true;
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
    await api.signup(username, email, password);
    return false;
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
    if (user?._id) {
      await api.setEstablishment(formData);
      return true;
    }
    console.log(user?._id);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signin,
        signout,
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
