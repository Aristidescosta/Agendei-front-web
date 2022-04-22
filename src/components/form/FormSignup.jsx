import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/auth/AuthContext"

export const FormSignup = () => {
  const auth = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {errors.password && <span className="error_msg">Este campo é obrigatório</span>}

      <input
        {...register("password2", { required: true })}
        type="password"
        placeholder="*********"
      />
      {errors.password2 && <span className="error_msg">Este campo é obrigatório</span>}
      
      {errors.password !== errors.password2 && <span className="error_msg">Palavras passes não coincidem</span>} 
      <Button type="submit">
        Entrar
      </Button>
    </form>
  );
};
