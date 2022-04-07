import schedule from "../../components/assets/img/schedule.svg";
import logo from "../../components/assets/img/logo.png";
import "../../styles/auth.scss";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

export function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if(email && password){
      const isLogged = await auth.signin(email, password)
      console.log(isLogged)
    }
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>{
    setEmail(event.target.value);
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) =>{
    setPassword(event.target.value);
  }
  return (
      <div className="page-absolute">
        <div id="page-auth">
      <aside>
        <img
          src={schedule}
          alt="Ilustração simbolizando uma pessoa, uma agenda e um relógio"
        />
        <strong>Crie seus estabelecimentos</strong>
        <p>
          Dê a si mesmo o poder e a facilidade de obtenção de clientes nos mais
          diversos estabelecimentos
        </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logo} alt="Logotipo do Agendei" />

          <h2>Fazer login</h2>

          <form>
            <input
              type="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Digite o seu email"
            />
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Digite a sua palavra passe"
            />
            <Button type="button" onClick={handleSubmit}>Entrar</Button>
          </form>

          <p>
            Ainda não sou inscrito! <Link to="/logup">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
      </div>
  );
}
