import { Button } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ModalInfo } from "../../components/modal/ModalInfo";
import { userPassword } from "../../utils/validations";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../../components/InputErrors";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";

interface IFormInput {
  password: string;
}

const myYupResolver = yup
  .object({
    password: yup.string().required().matches(userPassword),
  })
  .required();

export const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const email = localStorage.getItem("agendeiEmail");
    if (email) await auth.resetPassword(email, data.password);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
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

      <ModalInfo
        openModalInfo={open}
        handleOpenModalInfo={handleOpen}
        setOpenModalInfo={setOpen}
      />

      <div className="confirm-container">
        <form className="changePassword" onSubmit={handleSubmit(onSubmit)}>
          <h1>Escolher uma palavra-passe nova</h1>
          <p>
            Cria uma nova palavra-passe que tenha, pelo menos, 8 carateres. Para
            teres uma palavra-passe forte, usa uma combinação de letras
            maiúscula e minúscula, números e sinais de pontuação.
          </p>

          <div className="teste">
            <div>
              <input
                {...register("password")}
                type="password"
                placeholder="*********"
              />
              {errors.password?.message && (
                <InputError type={errors.password.type} field="password" />
              )}
            </div>
            <Button onClick={handleOpen} variant="contained" className="btn">
              <Info />
            </Button>
          </div>

          <div className="buttons">
            <Button variant="contained" className="btn">
              Cancelar
            </Button>
            <Button variant="contained" type="submit" className="btn">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
