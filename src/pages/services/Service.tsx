import "../establishment/establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ServiceList } from "./ServiceList";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ModalService } from "./ModalService";
import { AuthContext } from "../../contexts/auth/AuthContext";

type MeusDados = {
  id: string;
  name: string;
  horarios: Array<string>;
  preco: number;
};

export const Service = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [services, setServices] = useState<object | void>();
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => setOpenModalCreate(true);

  useEffect(() => {
    const getServices = async () => {
      if (id) {
        const response = await auth.getServices(id);
        setServices(response);
      }
    };
    getServices();
  }, []);
  console.log(services);

  const handleClick = () => {
    setShowAlert(false);
  };
  
  return (
    <section className="container establishment">
      {/* Modal para adicionar um novo serviço */}
      <ModalService
        handleOpenModalCreate={handleOpenModalCreate}
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
      />

      <h1 className="establishment-title">
        Nº de :
        <small className="establishment-sub">
          {services && Object(services).length}
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

      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpenModalCreate}
        endIcon={<AddShoppingCart />}
      >
        Adicionar novo serviço
      </Button>

      <div className="row">
        {services &&
          Object(services).map((datas: MeusDados) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xl-6">
              <ServiceList
                id={datas.id}
                name={datas.name}
                horarios={datas.horarios}
                preco={datas.preco}
                key={datas.id}
              />
            </div>
          ))}
      </div>
    </section>
  );
};
