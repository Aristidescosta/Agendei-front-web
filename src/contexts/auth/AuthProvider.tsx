import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Establishment } from "../../types/Establishment";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [establishment, setEst] = useState<Establishment | any>();
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("agendeiToken");
      if (storageData) {
        const response = await api.validateToken(storageData);
        if (response.data.user) setUser(response.data.user);
      }
    };
    validateToken();
  }, []);

  async function signUp(username: string, email: string, password: string) {
    const id = toast.loading("Por favor aguarde...");
    await api
      .signUp(username, email, password)
      .then((response) => {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        localStorage.setItem("agendeiEmail", email);
        window.location.href = "/confirmCode";
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function confirmCode(email: string, confirmationCode: string) {
    const id = toast.loading("Por favor aguarde...");
    await api
      .confirmCode(email, confirmationCode)
      .then((response) => {
        setUser(response.data.data.user);
        setToken(response.data.data.token);
        window.location.href = "/";
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function confirmCodeReset(email: string) {
    const id = toast.loading("Por favor aguarde...");
    await api
      .confirmCodeReset(email)
      .then((response) => {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function verifyEmail(email: string) {
    const id = toast.loading("Por favor aguarde...");
    await api
      .confirmCodeReset(email)
      .then((response) => {
        localStorage.setItem("agendeiEmail", email);
        window.location.href = "/resetPassword";
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function reConfirmCode(email: string, confirmationCodeReset: string) {
    const id = toast.loading("Por favor aguarde...");
    await api
      .reConfirmCode(email, confirmationCodeReset)
      .then((response) => {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        localStorage.setItem("agendeiEmail", email);
        window.location.href = "/changePassword";
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function resetPassword(email: string, newPassword: string) {
    const id = toast.loading("Por favor aguarde um instante...");
    await api
      .resetPassword(email, newPassword)
      .then((response) => {
        console.log(response.data.token)
        setUser(response.data.user);
        setToken(response.data.token);
        window.location.href = "/";
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        /* localStorage.setItem("agendeiEmail", email);*/
        window.location.href = "/"; 
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function login(email: string, password: string) {
    const id = toast.loading("Carregando, por favor aguarde...")
    await api
      .login(email, password)
      .then((response) => {
        toast.update(id, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setUser(response.data.data);
        setToken(response.data.token);
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  async function getEstablishment(userId: string) {
    const response = await api.getEstablishment(userId);
    return response.data;
  }

  async function getCategory() {
    const response = await api.getCategory();
    return response.data;
  }

  async function setEstablishment(formData: FormData) {
    const response = await api.setEstablishment(formData);
    return response;
  }

  async function getOneEstablishment(id: string) {
    const response = await api.getOneEstablishment(id);
    if (response) setEst(response.data);
  }

  async function deleteEstablishment(id: string) {
    let retorno = false;
    await api
      .deleteEstablishment(id)
      .then((response) => {
        toast.success(response.data.message);
        retorno = true;
      })
      .catch((error: AxiosError) => {
        toast.error(error.response?.data.message);
      });
    return retorno;
  }

  async function setImages(images: Array<object>, id: string){
    const idToast = toast.loading("Carregando, por favor aguarde...")
    await api
      .setImages(images, id)
      .then((response) => {
        toast.update(idToast, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .catch((error: AxiosError) => {
        toast.update(id, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
  }

  function setToken(token: string) {
    localStorage.setItem("agendeiToken", token);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        confirmCode,
        login,
        getEstablishment,
        getCategory,
        verifyEmail,
        setEstablishment,
        getOneEstablishment,
        establishment,
        setEst,
        deleteEstablishment,
        reConfirmCode,
        confirmCodeReset,
        resetPassword,
        setImages
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
