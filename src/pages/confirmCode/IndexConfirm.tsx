import { Button } from "@material-ui/core";
import React, { ChangeEvent, useState, useContext, FormEventHandler, FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
function initialValues() {
  return {
    number1: "",
    number2: "",
    number3: "",
    number4: "",
  };
}

export const ConfirmCodeReset = () => {
  const [values, setValues] = useState(initialValues);
  const auth = useContext(AuthContext);
  function onChangeValues(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    if (value.length <= 1)
      setValues({
        ...values,
        [name]: value,
      });
  }

  async function handleSubmit(event: FormEvent<HTMLElement>) {
    event.preventDefault();
    if (
      values.number1 === "" ||
      values.number2 === "" ||
      values.number3 === "" ||
      values.number4 === ""
    )
      toast.error("Por favor, digite todos os números");
    else {
      const allValues =
        values.number1 + values.number2 + values.number3 + values.number4;
      const userEmail = localStorage.getItem("agendeiEmail");
      if (userEmail) {
        await auth.reConfirmCode(userEmail, allValues);
        console.log(allValues)
      } else {
        toast.error("Erro de comunicação...");
      }
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        limit={1}
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
        <form className="changePassword" onSubmit={handleSubmit}>
          <h1>Inserir código de segurança 1</h1>
          <p>
            Procura no teu e-mail uma mensagem com o teu código. Este deve ter 4
            dígitos.
          </p>

          <div>
            <div className="inputs">
              <input
                type="number"
                onChange={onChangeValues}
                name="number1"
                value={values.number1}
              />
              <input
                type="number"
                onChange={onChangeValues}
                name="number2"
                value={values.number2}
              />

              <input
                type="number"
                onChange={onChangeValues}
                name="number3"
                value={values.number3}
              />

              <input
                type="number"
                onChange={onChangeValues}
                name="number4"
                value={values.number4}
              />
            </div>
            <div>
              <span>Enviamos o teu código para: </span>
              <p>{localStorage.getItem("agendeiEmail")}</p>
            </div>
          </div>

          <div>
            <Link to="/resetPassword">Não recebeste um código?</Link>
            <div className="buttons">
              <Button variant="contained" className="btn">
                Cancelar
              </Button>
              <Button type="submit" variant="contained" className="btn">
                Enviar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
