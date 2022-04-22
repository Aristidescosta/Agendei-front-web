import schedule from "../../components/assets/img/schedule.svg";
import logo from "../../components/assets/img/logo.png";
import "../../styles/auth.scss";
import { Link} from "react-router-dom";
import { FormSignup } from "../../components/form/FormSignup";

export function Signup() {

  return (
    <div className="page-absolute">
      <div id="page-auth">
        <aside>
          <img
            src={schedule}
            alt="Ilustração simbolizando uma pessoa, uma agenda e um relógio"
          />
          <strong>Faça agora a sua inscrição na nossa Startup</strong>
          <p>
            Se inscreva agora mesmo e leve o seu negócio em outro nível, seja a
            escolha número 1 dos clientes.
          </p>
        </aside>

        <main>
          <div className="main-content">
            <img src={logo} alt="Logotipo do Agendei" />

            <h2>Inscrever-se</h2>

            <FormSignup/>

            <p>
              Ainda não sou inscrito! <Link to="/logup">Clique aqui</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
