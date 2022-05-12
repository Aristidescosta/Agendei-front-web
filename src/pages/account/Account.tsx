import React, { useContext, useState } from "react";
import "./account.scss";
import user from "../../components/assets/img/user.jpg";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Business, People, Store } from "@material-ui/icons";

function Account() {
  const auth = useContext(AuthContext);
  const [userName, setUserName] = useState(auth.user?.username);

  return (
    <section className="account">
      <div className="row">
        <div className="col-md-6">
          <img src={user} alt="Imagem do usuário" />
        </div>
        <div className="col-md-6" >
          <div className="row h-100">
            <div className="col-lg-12">
              <Store />
            </div>

            <div className="col-lg-6 col-sm-6">
              <Business />
            </div>

            <div className="col-lg-6 col-sm-6">
              <People />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;
