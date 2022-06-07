import "../establishment/establishment.scss";
import { AddShoppingCart, Close, InfoSharp } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ServiceList } from "./ServiceList";
import { Button } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { ModalService } from "./ModalService";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Preloader } from "../../components/preloader/Index";

type MeusDados = {
  _id: string;
  name: string;
  horarios: Array<string>;
  preco: number;
};

export const Service = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [services, setServices] = useState<object | void>();
  const auth = useContext(AuthContext);
  const { estId } = useParams();
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const handleOpenModalCreate = () => setOpenModalCreate(true);

  useEffect(() => {
    const getServices = async () => {
      if (estId) {
        const response = await auth.getServices(estId);
        setServices(response);
      }
    };
    getServices();
  }, []); 

  const handleClick = () => {
    setShowAlert(false);
  };

  return (
    <>
      {!services ? (
        <Preloader />
      ) : (
        <section className="container establishment">
          {/* Modal para adicionar um novo serviço */}
          <ModalService
            handleOpenModalCreate={handleOpenModalCreate}
            openModalCreate={openModalCreate}
            setOpenModalCreate={setOpenModalCreate}
          />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <h1 className="establishment-title">
            Nº de serviços :
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
                <div className="col-lg-4 col-md-6 col-sm-6 col-xl-6">
                  <ServiceList
                    id={datas._id}
                    name={datas.name}
                    horarios={datas.horarios}
                    preco={datas.preco}
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
