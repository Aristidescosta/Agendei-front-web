import "../establishment/establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useState } from "react";
import { ServiceList } from "./ServiceList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { establishmentRows } from "../../data";

type MeusDados = {
  id: string;
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  location: string;
};


export const Service = () => {
    const [showAlert, setShowAlert] = useState(true);
  
  const handleClick = () => {
    setShowAlert(false);
  };

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

  return (
    <section className="container establishment">
      <h1 className="establishment-title">
        Nº de  : 
        <small className="establishment-sub">{establishmentRows.length}</small>
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

      <Link to={`new`}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<AddShoppingCart />}
        >
          Adicionar novo serviço
        </Button>
      </Link>

      <Link to={`new`}>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<AddShoppingCart />}
        >
          Adicionar novo serviço
        </Button>
      </Link>

      <div className="row">{establishmentList}</div>
    </section>
  );
};
