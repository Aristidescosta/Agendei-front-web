import schedule from "../../components/assets/img/schedule.svg";
import logo from "../../components/assets/img/logo.png";
import "../../styles/auth.scss";
import { Link } from "react-router-dom";
import { FormSign } from "../../components/form/FormSign";
import { ToastContainer } from "react-toastify";

export function Login() {
  return (
    <div className="page-absolute">
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        />
        {/* Same as */}
        <ToastContainer />
      <div id="page-auth">
        <aside>
          <img
            src={schedule}
            alt="Ilustração simbolizando uma pessoa, uma agenda e um relógio"
          />
          <strong>Crie seus estabelecimentos</strong>
          <p>
            Dê a si mesmo o poder e a facilidade de obtenção de clientes nos
            mais diversos estabelecimentos
          </p>
        </aside>

        <main>
          <div className="main-content">
            <img src={logo} alt="Logotipo do Agendei" />

            <h2>Fazer login</h2>

            <FormSign />

            <p>
              Ainda não sou inscrito! <Link to="/signup">Clique aqui</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
