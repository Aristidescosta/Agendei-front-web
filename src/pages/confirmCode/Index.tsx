import "./confirmCode.scss";
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { ChangeEvent, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function initialValues() {
  return {
    number1: "",
    number2: "",
    number3: "",
    number4: "",
  };
}

export const ConfirmCode = () => {
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

  async function handleSubmit() {
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
        await auth.confirmCode(userEmail, allValues);
      } else {
        toast.error("Erro de comunicação...");
      }
    }
  }

  function handleResetPassword() {
    const email = localStorage.getItem("agendeiEmail");
    if (email) auth.confirmCodeReset(email);
    else toast.error("Falha na comunicação!");
  }

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
        <form>
          <h1>Confirmação de conta</h1>
          <p>Verifique o seu email, enviamos um código de confirmação</p>

          <div>
            <div className="inputs">
              <input
                type="number"
                onChange={onChangeValues}
                value={values.number1}
                name="number1"
                maxLength={1}
                max={9}
              />
              <input
                type="number"
                onChange={onChangeValues}
                value={values.number2}
                name="number2"
              />
              <input
                type="number"
                onChange={onChangeValues}
                value={values.number3}
                name="number3"
              />
              <input
                type="number"
                onChange={onChangeValues}
                value={values.number4}
                name="number4"
              />
            </div>

            <span className="reset-password" onClick={handleResetPassword}>
              Reenviar código
            </span>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<Send />}
          >
            Enviar código
          </Button>
        </form>
      </div>
    </main>
  );
};
