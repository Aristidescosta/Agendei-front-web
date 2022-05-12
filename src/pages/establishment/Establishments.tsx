import "./establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { EstablishmentList } from "./EstablishmentList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { establishmentRows } from "../../data";
import { AuthContext } from "../../contexts/auth/AuthContext";

type MeusDados = {
  id: string;
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
          <InfoSharp />
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
                id={datas.id}
                name={datas.name}
                nif={datas.nif}
                img={"http://192.168.1.5:3005/" + datas.img}
                address={datas.address}
                key={datas.id}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
