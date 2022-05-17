import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import "../confirmCode/confirmCode.scss";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../../components/InputErrors";
import { userEmail } from "../../utils/validations";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
}

const myYupResolver = yup
  .object({
    email: yup.string().required().matches(userEmail)
  })
  .required();

export const ResetPassword = () => {
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    await auth.verifyEmail(data.email);
  };
  return (
    <main>
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
      <div className="background-fit">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="confirm-container">
        <form id="reset" onSubmit={handleSubmit(onSubmit)}>
          <h1>Encontrar a tua conta</h1>
          <p>Insere o teu e-mail para procurares a tua conta.</p>
          <input {...register("email")} type="email" placeholder="Email" />
          {errors.email?.message && (
            <InputError type={errors.email.type} field="email" />
          )}
          <Button variant="contained" color="primary" endIcon={<Send />} type="submit">
            Enviar email
          </Button>
        </form>
      </div>
    </main>
  );
};
