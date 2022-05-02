import "../establishment/establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { ServiceList } from "./ServiceList";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { establishmentRows } from "../../data";

type MeusDados = {
  id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  location: string;
};

type paramsIdType <id1: number, id: string> = {
  id1:number;
  id: number;
}

export const Service = () => {
  const api = useApi();
  const auth = useContext(AuthContext);

  const [dataEstablishment, setDataEstablishment] = useState<[]>([]);
  const [showAlert, setShowAlert] = useState(true);

  const { id1, id } = useParams<paramsIdType>();
  
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
  }, []);

  const establishmentList = establishmentRows.map((datas: MeusDados) => (
    <div className="col-lg-4 col-sm-6">
      <ServiceList
        id={datas.id}
        name={datas.name}
        nif={datas.nif}
        img={datas.img}
        location={datas.location}
        key={datas.id}
      />
    </div>
  ));

  if (typeof id1 === "number") {
    console.log(establishmentRows[id1]) 
  }

  return (
    <section className="container establishment">
      <h1 className="establishment-title">
        Nº de  : 
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
