import { useState } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Schedule } from "@material-ui/icons";
import "./service.scss";
import { ModalService } from "./ModalService";
import ModalDeleted from "../../components/modal/ModalDeleted";

type PropsType = {
  id: string;
  name: string;
  horarios: Array<string>;
  preco: number;
};

type precoType = {
  horario: string;
};

export const ServiceList = (props: PropsType) => {
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => setOpenModalDelete(true);

  const handleOpenModalCreate = () => setOpenModalCreate(true);

  return (
    <>
      {/* Modal de confirmação para eliminar algo */}
      <ModalDeleted
        handleOpenModalDelete={handleOpenModalDelete}
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
      />

      <div className="card">
        <div className="card-content">
          <div className="card-title">
            <h1>{props.name}</h1>
            <p>&#9733; &#9733; &#9733; &#9733; &#9733;</p>
          </div>
          <div className="card-price">
            <h1>{props.preco}kzs</h1>
          </div>
          <div className="card-hour">
            <h4>Horários</h4>
            <ul>
              {props.horarios.map((value) => (
                <li>
                  <div>
                    <span>{value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

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

            <Link to={`${props.id}/schedules`}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                startIcon={<Schedule />}
              >
                Eliminar
              </Button>
            </Link>

            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<Schedule />}
            >
              Atualizar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
