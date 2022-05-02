import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ModalDeleted from "../../components/modal/ModalDeleted";
import { ModalEdit } from "../../components/modal/ModalEdit";

type PropsType = {
  id: string;
  img: string;
  name: string;
  nif: number;
  location: string;
};

export const ServiceList = (props: PropsType) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  
  const handleOpenModalDelete = () => setOpenModalDelete(true);

  const handleOpenModalEdit = () => setOpenModalEdit(true);

  return (
    <>
      {/* Modal para adicionar um novo estabelecimento */}
      <ModalEdit
        handleOpenModalEdit={handleOpenModalEdit}
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
      />

      {/* Modal de confirmação para eliminar algo */}
      <ModalDeleted
        handleOpenModalDelete={handleOpenModalDelete}
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
      />

      <Card>
        <CardHeader title={props.name} />
        <CardMedia
          component="img"
          height="194"
          image={props.img}
          alt={"Imagem de um/a " + props.name}
        />
        <CardContent>
          <Typography variant="body2">
            Localizção
            <br />
            Bairro: {props.location}
            <br />
            Nº de NIF: {props.nif}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={handleOpenModalEdit}
            startIcon={<CloudUploadIcon />}
          >
            Atualizar
          </Button>

          <Link to={`/establishment/service/${1}/${props.id}`}>
            <Button type="button" variant="outlined" color="primary">
              Serviços
            </Button>
          </Link>

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={handleOpenModalDelete}
            startIcon={<DeleteIcon />}
          >
            Eliminar
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
