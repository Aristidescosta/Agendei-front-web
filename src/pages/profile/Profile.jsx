import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/profile.scss";
import avatar from "../../components/assets/img/user.jpg";
import { Avatar } from "@material-ui/core";
import { Button } from "../../components/Button";

export const Profile = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);
  console.log(show);
  const handleSetShow = () => {
    setShow(false);
    handleClick();
  };

  const handleRemoveShow = () => {
    setShow(true);
    handleClick();
  };

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <section className="profile">
      <div>
        <h1>Perfil</h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">User</li>
          <li className="breadcrumb-item active">Perfil</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <Avatar src={avatar} />
              <h2>Aristides Costa</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body align-items-start">
              <ul className="nav nav-tabs">
                <li className="nav-item ">
                  <button
                    onClick={handleSetShow}
                    className={active ? "nav-link active" : "nav-link"}
                  >
                    Editar perfil
                  </button>
                </li>

                <li className="nav-item ">
                  <button
                    className={active ? "nav-link" : "nav-link active"}
                    onClick={handleRemoveShow}
                  >
                    Alterar palavra passe
                  </button>
                </li>
              </ul>

              <div className={show ? "fade" : "fade show"}>
                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="userProfileImg"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Imagem do perfil
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <img src={avatar} alt="Imagem do usuário" />
                      <div>
                        <a
                          href="#"
                          className="btn btn-primary btn-sm"
                          title="Atualizar a imagem do perfil"
                        >
                          <i className="bi bi-upload"></i>
                        </a>
                        <a
                          href="#"
                          className="btn btn-danger btn-sm"
                          title="Remover a imagem do perfil"
                        >
                          <i className="bi bi-trash"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="fullName"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Nome completo
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        id="fullName"
                        value="Aristides Costa"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="Phone" className="col-md-4 col-lg-3 col-form-label">
                      Telefone
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="phone"
                        type="text"
                        className="form-control"
                        id="Phone"
                        value="(+244) 931-818-200"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="Email" className="col-md-4 col-lg-3 col-form-label">
                      Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="Email"
                        value="aristidiscosta200@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <Button type="submit">
                      Salvar alterações
                    </Button>
                  </div>
                </form>
              </div>

              <div className={show ? "fade show password" : "fade password"}>
                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="currentPassword"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Palavra passe atual
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="currentPassword"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="newPassword"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Nova Palavra passe
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="newPassword"
                        type="password"
                        className="form-control"
                        id="newPassword"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="renewPassword"
                      className="col-md-4 col-lg-3 col-form-label"
                    >
                      Digite novamente a palavra passe
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="renewpassword"
                        type="password"
                        className="form-control"
                        id="renewPassword"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                  <Button type="submit">
                      Alterar palavra passe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
