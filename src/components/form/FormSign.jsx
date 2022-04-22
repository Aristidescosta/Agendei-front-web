import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/auth/AuthContext"

export const FormSign = () => {
  const auth = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [logged, setLogged] = useState(false);
  const [texto, setTexto] = useState("Conectando");
  const [classConnect, setClassConnect] = useState("connected");
  const onSubmit = async (data) => {
    setLogged(true)
    try {
      setClassConnect("connected");
      setTexto("Conectando");
      const response = await auth.signin(data.email, data.password);
      if (!response) {
        setTexto("Você não está conectado a internet.");
        setClassConnect("error_connected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={logged ? classConnect : "hiden"}>
        <span>{texto} </span>
      </div>

      <input
        {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
        type="email"
        placeholder="Digite o seu email"
      />
      {errors.email?.type === "required" && <span className="error_msg">Email inválido</span>}
      <input
        {...register("password", { required: true })}
        type="password"
        placeholder="Digite a sua palavra passe"
      />
      {errors.password && <span className="error_msg">Este campo é obrigatório</span>}
      <Button type="submit">
        Entrar
      </Button>
    </form>
  );
};
