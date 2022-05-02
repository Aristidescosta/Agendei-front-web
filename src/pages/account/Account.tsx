import React from "react";
import "./account.scss";
import user from "../../components/assets/img/profile1.png";

function Account() {
  return (
    <section className="account">
      <div>
        <aside>
          <img src={user} />
        </aside>

        <section>
          <div>
            <span>Nome do usuário</span>
            <h3>Aristides da Costa</h3>
          </div>

          <div>
            <span>Email</span>
            <h3>aristidescosta200@gmail.com</h3>
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
