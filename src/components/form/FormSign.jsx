import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/auth/AuthContext"
import toast, { Toaster } from "react-hot-toast";

export const FormSign = () => {
  const auth = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await auth.signin(data.email, data.password);
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
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
