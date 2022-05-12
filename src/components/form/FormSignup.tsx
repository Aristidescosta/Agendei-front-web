import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../Button";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userEmail, userPassword } from "../../utils/validations";
import { InputError } from "../InputErrors";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import "react-toastify/dist/ReactToastify.min.css";
 
interface IFormInput {
  email: string;
  password: string;
  password2: string;
  name: string;
}

const myYupResolver = yup
  .object({
    name: yup.string().required().min(9).max(20),
    email: yup.string().matches(userEmail).required(),
    password: yup.string().required().min(8).max(20).matches(userPassword),
    password2: yup.string().required().min(8).max(20).matches(userPassword),
  })
  .required();

export const FormSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const auth = useContext(AuthContext);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.password2) {
      toast.error("Palavras passes diferentes!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else { 
      await auth.signUp(data.name, data.email, data.password);
    }
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Admin" />
        {errors.name?.message && (
          <InputError type={errors.name.type} field="name" />
        )}

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

        <input
          {...register("password2")}
          type="password"
          placeholder="*********"
        />
        {errors.password2?.message && (
          <InputError type={errors.password2.type} field="password2" />
        )}

        <Button type="submit">Entrar</Button>
      </form>
    </>
  );
};
