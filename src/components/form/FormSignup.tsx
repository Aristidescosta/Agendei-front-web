import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { AuthContext } from "../../contexts/auth/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
  password2: string;
  name: string;
}

export const FormSignup = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password2 === data.password) {
      auth.setEmail(data.email);
      const response = await auth.signup(data.name, data.email, data.password)
      console.log(response);
      console.log(data.email);
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
        {...register("name", { required: true, maxLength: 20 })}
        placeholder="Admin"
      />
      {errors.name && <span className="error_msg">Nome muito longo</span>}
 
      <input
        {...register("email", { pattern: /\S+@\S+\.\S+/ })}
        type="email"
        placeholder="admin@gmail.com"
      />
      {errors.email && <span className="error_msg">Email inválido</span>}

      <input
        {...register("password", { required: true, minLength: 8, maxLength: 20 })}
        type="password"
        placeholder="*********"
      />
      {errors.password && (
        <span className="error_msg">No mínimo 8 caracteres e máximo 20</span>
      )}

      <input
        {...register("password2", { required: true, minLength: 8, maxLength: 20 })}
        type="password"
        placeholder="*********"
      />
      {errors.password2 && (
        <span className="error_msg">No mínimo 8 caracteres e máximo 20</span>
      )}

      <Button type="submit">Entrar</Button>
    </form>
  );
};
