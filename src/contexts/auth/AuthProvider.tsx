import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Establishment } from "../../types/Establishment";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [email, setEmail] = useState<string>(); 
  const [establishment, setEst] = useState<Establishment |any>();
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
 
  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("agendeiToken");
      if(storageData){
        const response = await api.validateToken(storageData)
        if(response.data.user)        
          setUser(response.data.user); 
      }
    }
    validateToken();
  }, []);

  async function signUp(username: string, email: string, password: string) {
    await api
      .signUp(username, email, password)
      .then((response) => {
        window.location.href = "/confirmCode";
        toast.success("EMAIL CADASTRADO COM SUCESSO!");
        localStorage.setItem("agendeiEmail", email);
      })
      .catch((error: AxiosError) => {
        toast.error(error.response?.data.message);
      });
  }

  async function confirmCode(email: string, confirmationCode: string) {
    let retorno = false;

    await api
      .confirmCode(email, confirmationCode)
      .then((response) => {
        toast.success(response.data.message);
        if (response.status === 201) {
          setUser(response.data.data.user);
          setToken(response.data.data.token);
        }
        retorno = true;
      })
      .catch((error: AxiosError) => {
        toast.error(error.response?.data.message);
        return false;
      });
    return retorno;
  }

  async function reConfirmCode(email: string) {
    await api.reConfirmCode(email).then((response) => {
      toast.success(response.data.message);
    });
  }

  async function login(email: string, password: string) {
    await api
      .login(email, password)
      .then((response) => {
        setUser(response.data.data);
        setToken(response.data.token);
      })
      .catch((error: AxiosError) => {
        toast.error(error.response?.data.message);
      });
  }

  async function getEstablishment(userId: string){
    const response = await api.getEstablishment(userId)
    return response.data
  }

  async function getCategory(){
    const response = await api.getCategory();
    return response.data;
  }

  async function setEstablishment(formData: FormData){
    const response = await api.setEstablishment(formData)
    return response;
  }

  

  async function getOneEstablishment(id: string){
    const response = await api.getOneEstablishment(id);
    if(response)
      setEst(response.data)
    console.log(establishment) 
  }

  async function deleteEstablishment(id: string){
    let retorno = false;
    await api.deleteEstablishment(id)
    .then((response) => {
      toast.success(response.data.message);
      retorno = true;
    })
    .catch((error: AxiosError) => {
      toast.error(error.response?.data.message);
    }); 
    return retorno;
  }

  function setToken(token: string) {
    localStorage.setItem("agendeiToken", token);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        email,
        setUser,
        setEmail,
        signUp,
        confirmCode,
        reConfirmCode,
        login,
        getEstablishment,
        getCategory,
        setEstablishment,
        getOneEstablishment,
        establishment,
        setEst,
        deleteEstablishment
      }} 
    >
      {children}
    </AuthContext.Provider>
  );
};
