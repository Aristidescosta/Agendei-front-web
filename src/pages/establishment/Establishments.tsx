import "../../styles/establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { EstablishmentList } from "../../components/EstablishmentList";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom"

type MeusDados = {
  _id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  address: {
    bairro: string;
    rua: number;
  };
};

export const Establishments = () => {
  const api = useApi();
  const auth = useContext(AuthContext);

  const [dataEstablishment, setDataEstablishment] = useState<[]>([]);
  const [showAlert, setShowAlert] = useState(true);

  const handleClick = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const getEstablishment = async () => {
      if (auth.user) {
        const response = await api.getEstablishment(auth.user._id);
        setDataEstablishment(response);
      }
    };

    getEstablishment();
  });

  const establishmentList = dataEstablishment.map((datas: MeusDados) => (
    <EstablishmentList
      id={datas._id}
      img={"https://teste-api-api.herokuapp.com/" + datas.img}
      name={datas.name}
      nif={datas.nif}
      address={datas.address}
    />
  ));

  return (
    <section className="establishment">
      <h1 className="establishment-title">
        Nº total de estabelecimentos:
        <small className="establishment-sub">{dataEstablishment.length}</small>
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

      <div className="row">{establishmentList}</div>
    </section>
  );
};
