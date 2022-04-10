import { Link } from "react-router-dom";
import { Button } from "./Button";

export const EstablishmentList = (props) => {
  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body">
            <span>{props.name}</span>
            <div className="featureMoneyContainer">
              <img src={props.img} alt={"imagem de um " + props.name} />
              <span className="featuredMoney">Nº de agendamentos: </span>
              <span>{props.services}</span>

              <span className="featuredMoney">Localização: </span>
              <span>{props.address.bairro}</span>
              <span>, {props.address.rua}</span>

              <span className="featuredMoney">Nº de nif: </span>
              <span>{props.nif}</span>
            </div>
            <div className="button-flex">
              <Link to={"/establishment/" + props.id}>
                <Button type="button">editar</Button>
              </Link>

              <Link to={"/establishment/service/" + props.id}>
                <Button type="button">Ver Serviços</Button>
              </Link>

              <Button
                onClick={() => props.deletedEstablishment(props.id)}
                type="button"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
