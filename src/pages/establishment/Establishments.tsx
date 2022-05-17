import "./establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { EstablishmentList } from "./EstablishmentList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import birdInfo from "../../components/assets/img/bird-info.svg";
import ContentLoader, { List } from "react-content-loader";
import { dev } from "../../config/config";

type MeusDados = {
  _id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  address: string;
};

export const Establishments = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [establishment, setEstablishment] = useState<object | void>();
  const [category, setCategory] = useState();

  const auth = useContext(AuthContext);
  const handleClick = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const getEstablishment = async () => {
      if (auth.user) {
        const response = await auth.getEstablishment(auth.user._id);
        setEstablishment(response);
      }
    };

    getEstablishment();
  }, []);

  return (
    <>
      {!establishment ? (
        <List />
      ) : (
        <section className="container establishment">
          <h1 className="establishment-title">
            Nº total de estabelecimentos:
            <small className="establishment-sub">
              {establishment && Object(establishment).length}
            </small>
          </h1>

          <div className={showAlert ? "alert-info show" : "alert-info hidden"}>
            <button onClick={handleClick}>
              <Close />
            </button>
            <span>
              <img src={birdInfo} alt="" />
              <strong>Agendei admin</strong> novo estabelecimento adicionado com
              sucesso.
            </span>
          </div>

          <Link to="new">
            <Button
              variant="outlined"
              color="primary"
              endIcon={<AddShoppingCart />}
            >
              Adicionar novo estabelecimento
            </Button>
          </Link>

          <div className="row">
            {establishment &&
              Object(establishment).map((datas: MeusDados) => (
                <div className="col-lg-4 col-sm-6">
                  <EstablishmentList
                    _id={datas._id}
                    name={datas.name}
                    nif={datas.nif}
                    img={`${dev.API_URL}/` + datas.img}
                    address={datas.address}
                    key={datas._id}
                  />
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
};
