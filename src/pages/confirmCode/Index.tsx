import "./confirmCode.scss";
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { ChangeEvent, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { ToastContainer } from "react-toastify";
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
  const navigate = useNavigate();
  function onChangeValues(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;

    if (value.length === 1) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  }

  async function handleSubmit() {
    document.getElementsByClassName("MuiButton-label")[0].textContent =
      "Verificando...";
    const allValues =
      values.number1 + values.number2 + values.number3 + values.number4;
    const email = localStorage.getItem("agendeiEmail");
    console.log(allValues);
    if (email) {
      const response = await auth.confirmCode(email, allValues);
      if(response)
        navigate("/")
    }
  }

  function handleResetPassword(){
    const email = localStorage.getItem("agendeiEmail")
    if(email)
      auth.reConfirmCode(email)
  }

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

      <div className="confirm-container">
        <div className="content-confirm">
          <div className="information">
            <h1>Confirmação de conta</h1>
            <p>Verifique o seu email, enviamos um código de confirmação</p>
          </div>
          <form>
            <input
              type="number"
              onChange={onChangeValues}
              value={values.number1}
              name="number1"
              max={9}
            />
            <input
              type="number"
              onChange={onChangeValues}
              value={values.number2}
              name="number2"
              maxLength={1}
            />
            <input
              type="number"
              onChange={onChangeValues}
              value={values.number3}
              name="number3"
              maxLength={1}
            />
            <input
              type="number"
              onChange={onChangeValues}
              value={values.number4}
              name="number4"
              maxLength={1}
            />
          </form>
          <span className="reset-password" onClick={handleResetPassword}>Reenviar código</span>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<Send />}
          >
            Enviar código
          </Button>
        </div>
      </div>
    </>
  );
};
