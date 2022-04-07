import { Button } from "./Button";
import "../styles/establishment.scss";
import "../styles/services.scss";
import { useParams, Link } from "react-router-dom";

export const ServicesList = ({ ids, name, clients, price, deletedService }) => {
  const { id } = useParams();

  return (
    <div className="col-lg-3 col-md-6">
      <div className="card">
        <div className="card-body">
          <span>{name}</span>
          <div className="featureMoneyContainer">
            <div>
              <span className="featuredMoney">Nº de clientes: </span>
              <span className="featuredMoneyRate">{clients}</span>
            </div>

            <div>
              <span className="featuredMoney">Preço do serviço: </span>
              <span className="featuredMoneyRate">{price}</span>
            </div>
          </div>
          <div className="button-flex">
            <Link to={"/establishment/service/" + id + "/edit/" + ids}>
              <Button type="button">Editar</Button>
            </Link>
            <Button onClick={() => deletedService(ids)} type="button">
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
