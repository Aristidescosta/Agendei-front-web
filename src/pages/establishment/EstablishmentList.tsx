import { useState, useContext } from "react";
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
import { AuthContext } from "../../contexts/auth/AuthContext";

type PropsType = {
  _id: string;
  img: string;
  name: string;
  nif: number;
  address: string;
};

export const EstablishmentList = (props: PropsType) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = async () => {
    setOpenModalDelete(true);
    await auth.getOneEstablishment(props._id);
  };
  const auth = useContext(AuthContext);
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

      <Card className="m">
        <CardHeader title={props.name} />
        <CardMedia
          component="img"
          height="194"
          image={props.img}
          alt={"Imagem de um/a " + props.name}
        />
        <CardContent>
          <Typography variant="body2">
            Localização: {props.address}
            <br />
            Nº de NIF: {props.nif}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/establishment/" + props._id}>
            <Button type="button" variant="outlined" color="primary">
              Ver mais
            </Button>
          </Link>

          <Link to={`establishment/${props._id}/edit`}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Atualizar
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
