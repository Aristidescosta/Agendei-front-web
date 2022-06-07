import { useState } from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit, Timer } from "@material-ui/icons";
import "./service.scss";
import ModalDeleted from "./ModalDeleted";
import { ModalServiceEdit } from "./ModalServiceEdit";

type PropsType = {
  id: string;
  name: string;
  horarios: Array<string>;
  preco: number;
};

export const ServiceList = (props: PropsType) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(true);
  return (
    <>
      {/* Modal de confirmação para eliminar algo */}
      <ModalDeleted
        handleOpenModalDelete={handleOpenModalDelete}
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        idDelete={props.id}
      />

      <ModalServiceEdit
        handleOpenModalEdit={handleOpenModalEdit}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        idService={props.id}
      />

      <div className="card container">
        <div className="card-container">
          <article className="card-content">
            <div className="card-price">
              <div className="card-price-number">
                {props.preco}
                <span className="card-price-symbol">kzs</span>
              </div>
            </div>
            <header className="card-header">
              <h1 className="card-header-title">{props.name}</h1>
            </header>
            <ul className="card-list">
              {props.horarios.map((value) => (
                <li className="card-list-item">
                  <Timer className="card-list-icon" />
                  <p className="card-list-description">{value}</p>
                </li>
              ))}
            </ul>

            <div className="card-buttons">
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleOpenModalDelete}
                startIcon={<DeleteIcon />}
              >
                Eliminar
              </Button>

              {/* <Link to={`${props.id}/schedules`}>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  startIcon={<Event />}
                >
                  Ver agendamentos
                </Button>
              </Link> */}

              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={handleOpenModalEdit}
                startIcon={<Edit />}
              >
                Editar serviço
              </Button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};
