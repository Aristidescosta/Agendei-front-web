import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../InputErrors";
import { userEmail, userPassword } from "../../utils/validations";
import "react-toastify/dist/ReactToastify.min.css";
import { Button } from "@material-ui/core"
import { toast } from "react-toastify";


interface IFormInput {
  email: string;
  password: string;
}

const myYupResolver = yup
  .object({
    email: yup.string().matches(userEmail).required(),
    password: yup.string().required().min(8).max(20).matches(userPassword),
  })
  .required();

export const FormSign = () => {
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    toast.loading("Carregando...")
    await auth.login(data.email, data.password)
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="email"
          placeholder="admin@gmail.com"
        />
        {errors.email?.message && (
          <InputError type={errors.email.type} field="email" />
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="*********"
        />
        {errors.password?.message && (
          <InputError type={errors.password.type} field="password" />
        )}

        <Button type="submit" color="primary">Entrar</Button>
      </form>
  );
};
