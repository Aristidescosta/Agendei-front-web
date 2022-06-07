import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Establishment } from "../../types/Establishment";
import { Service } from "../../types/Service";
import { SignPreloader } from "../../components/preloader/SignPreloader";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [establishment, setEst] = useState<Array<Establishment> | any>();
  const [appointment, setAppointment] = useState<Array<Establishment> | any>();
  const [service, setService] = useState<Service | any>();
  const [user, setUser] = useState<User | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [text, setText] = useState<boolean | undefined>();

  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("agendeiToken");
      if (storageData) { 
        <SignPreloader/>
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
        console.log(response.data.token);
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
    const id = toast.loading("Carregando, por favor aguarde...");
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

  async function getOneEstablishment(id: string) {
    const response = await api.getOneEstablishment(id);
    setEst(response.data);
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

  async function deletedService(id: string) {
    let retorno = false;
    await api
      .deletedService(id)
      .then((response) => {
        toast.success(response.data.message);
        retorno = true;
      })
      .catch((error: AxiosError) => {
        toast.error(error.response?.data.message);
      });
    return retorno;
  }

  async function setServices(
    name: string,
    preco: string,
    hours: Array<string>,
    est: object
  ) {
    let returned = false;
    const idToast = toast.loading(
      "Processando seu pedido, por favor aguarde..."
    );
    await api
      .setServices(name, preco, hours, est)
      .then((response) => {
        toast.update(idToast, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        returned = true;
      })
      .catch((error: AxiosError) => {
        toast.update(idToast, {
          render: error.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      });
    return returned;
  }

  async function getService(id: string) {
    const response = await api.getService(id)
    return response.data;
  }

  async function getServices(id: string) {
    const response = await api.getServices(id);
    return response.data;
  }

  async function getAppointments(id: string){
    const response = await api.getAppointments(id);
    return response.data;
  }

  async function openOrCloseEstablishment(id: string, open: boolean) {
    const idToast = toast.loading("Carregando, por favor aguarde...");
    await api
      .openOrCloseEstablishment(id, open)
      .then((response) => {
        setText(response.data.text);
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
        getOneEstablishment,
        establishment,
        setEst,
        deleteEstablishment,
        reConfirmCode,
        confirmCodeReset,
        resetPassword,
        openOrCloseEstablishment,
        text,
        setText,
        getServices,
        getService,
        setServices,
        service,
        deletedService,
        getAppointments,
        appointment,
        setShowAlert,
        showAlert
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
