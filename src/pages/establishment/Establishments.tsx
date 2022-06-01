import "./establishment.scss";
import { AddShoppingCart, Close } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { EstablishmentList } from "./EstablishmentList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import birdInfo from "../../components/assets/img/bird-info.svg";
import { Preloader } from "../../components/preloader/Index";
import { dev } from "../../config/config";

type MeusDados = {
  _id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  address: string;
  open: boolean;
  establishment: Array<object>
}; 

export const Establishments = () => {
  const [establishment, setEstablishment] = useState<Array<object> | void>();
  const auth = useContext(AuthContext);
  const handleClick = () => {
    auth.setShowAlert(false);
  };

  useEffect(() => {
    const getEstablishment = async () => {
      if (auth.user) {
        const response = await auth.getEstablishment(auth.user._id);
        setEstablishment(response);
      }
    };
    getEstablishment();
  }, [auth.establishment?.open]);

  return (
    <>
      {!establishment ? (
        <Preloader />
      ) : (
        <section className="container establishment">
          <h1 className="establishment-title">
            Nº total de estabelecimentos:
            <small className="establishment-sub">
              {establishment && establishment.length}
            </small>
          </h1>

          <div className={auth.showAlert ? "alert-info show" : "alert-info hidden"}>
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
            {Object(establishment).map((datas: MeusDados) => (
              <div className="col-lg-4 col-sm-6">
              <EstablishmentList
                _id={datas._id}
                name={datas.name}
                nif={datas.nif}
                img={`${dev.API_URL}/` + datas.img}
                address={datas.address}
                open={datas.open}
                establishment={datas.establishment}
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
