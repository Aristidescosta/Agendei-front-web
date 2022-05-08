import React, { useContext } from "react";
import "./account.scss";
import user from "../../components/assets/img/profile1.png";
import { AuthContext } from "../../contexts/auth/AuthContext";


function Account() {
  const auth = useContext(AuthContext)
  
  return (
    <section className="account">
      <div>
        <aside>
          <img src={user} />
        </aside>

        <section>
          <div>
            <span>Nome do usuário</span>
            <h3>{ auth.user?.username }</h3>
          </div>

          <div>
            <span>Email</span>
            <h3>{ auth.user?.email }</h3>
          </div>

          <div>
            <div>
              <span>Nº de estabelecimentos</span>
              <h3>3</h3>
            </div>

            <div>
              <span>Nº de serviços</span>
              <h3>23</h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Account;
