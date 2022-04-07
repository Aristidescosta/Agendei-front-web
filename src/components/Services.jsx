import React, { useState } from "react";
import { Close, InfoSharp } from "@material-ui/icons";
import { ServicesList } from "./ServicesList";
import { services } from "../data";
import { useParams, Link } from "react-router-dom";

export const Services = (props) => {
  const { id } = useParams();
  const [buttonClose, setButtonClose] = useState(false);

  const deletedService = (id) => {
    /* Primeiro deverá ser disparado uma mensagem de confirmação */
    alert("Este serviço será eliminado!");
    const remainingServices = props.data.filter((service) => id !== service.id);
    props.setData(remainingServices);
  };

  const handleClick = () => {
    setButtonClose(!buttonClose);
  };
  const servicesList = props.data.map((service) => (
    <ServicesList
      ids={service.id}
      name={service.serviceName}
      img={service.avatar}
      clients={service.clientes}
      price={service.preco}
      deletedService={deletedService}
      key={service.id}
    />
  ));

  return (
    <section className="establishment">
      <div>
        <h1>Serviços de {props.dataEstablishment[id - 1].establishmentName}</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/establishments">Estabelecimentos</Link>
          </li>
          <li class="breadcrumb-item">Serviços</li>
        </ol>
      </div>

      <div className="featured">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="card">
              <Link
                to="/establishment/service/new"
                className="card-body establishmentAdd"
              >
                <h1>+</h1>
              </Link>
            </div>
          </div>

          {servicesList}
        </div>
      </div>
    </section>
  );
};
