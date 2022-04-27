import React, { FormEventHandler, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { string } from "yup";

interface IFormInput {
  email: string;
  password: string;
  password2: string;
  username: string;
}

export const FormSignup = () => {
  const api = useApi();
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password2 === data.password) {
      toast.loading("Carregando");
      auth.setEmail(data.email);
      const response = await auth.signup(data.username, data.email, data.password)
      if(response){
        navigate("/confirmCode");
      }
      
    } else {
      toast.error("Palavras passe diferentes");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <input
        {...register("username", { required: true, maxLength: 20 })}
        placeholder="Admin"
      />
      {errors.username && <span className="error_msg">Nome muito longo</span>}

      <input
        {...register("email", { pattern: /\S+@\S+\.\S+/ })}
        type="email"
        placeholder="admin@gmail.com"
      />
      {errors.email && <span className="error_msg">Email inválido</span>}

      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="*********"
      />
      {errors.password && (
        <span className="error_msg">Este campo é obrigatório</span>
      )}

      <input
        {...register("password2", { required: true })}
        type="password"
        placeholder="*********"
      />
      {errors.password2 && (
        <span className="error_msg">Este campo é obrigatório</span>
      )}

      <Button type="submit">Entrar</Button>
    </form>
  );
};
