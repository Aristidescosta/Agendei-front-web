import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { Email } from "../../types/Email";
import { useApi } from "../../hooks/useApi";
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
          setUser(response.user);
          setToken(response.token);
        }
      }
    };
    validateToken();
  }, []);
  

  const signin = async (email: string, password: string) => {
    const response = await api.signin(email, password);
    if(response.user && response.token){
      setUser(response.user);
      setToken(response.token);
    }
    
    /* if (response?.status === 200) {
      
      return true;
    }
    if (response?.status === 422) {
      toast.error(response.data.message);
      return false;
    } */
    return false;
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
      console.log(response);
      toast.error(response.data.message.toUpperCase());
    }
    if(response?.status === 302){
      toast.success(response.data.message.toUpperCase());    
      return true;  
    }
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

  const confirmCode = async (email: string, confirmCode: number) => {
    const response = await api.confirmCode(email, confirmCode)
    console.log(response)
    return response
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
