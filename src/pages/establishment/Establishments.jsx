import "../../styles/establishment.scss";
import { Close, InfoSharp } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EstablishmentList } from "../../components/EstablishmentList";

export const Establishments = ({ dataEstablishment, setDataEstablishment }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(false);
  };

  const deletedEstablishment = (id) => {
    /* Primeiro deverá ser disparado uma mensagem de confirmação */
    alert("Este estabelecimento será eliminado!");
    const remainingEstablishment = dataEstablishment.filter(
      (establishment) => id !== establishment.id
    );
    setDataEstablishment(remainingEstablishment);
  };

  const establishmentList = dataEstablishment.map((datas) => (
    <EstablishmentList
      id={datas.id}
      img={datas.img}
      name={datas.establishmentName}
      services={datas.services}
      category={datas.categoryValue}
      location={datas.location}
      deletedEstablishment={deletedEstablishment}
      key={datas.id}
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
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <Link to="/establishments/new" className="card-body establishmentAdd">
              <h1>+</h1>
            </Link>
          </div>
        </div>

        {establishmentList}
      </div>
    </section>
  );
};
