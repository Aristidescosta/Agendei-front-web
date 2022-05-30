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
import { LockOpenOutlined, Lock } from "@material-ui/icons";

type PropsType = {
  _id: string;
  img: string;
  name: string;
  nif: number;
  address: string;
  open: boolean;
  establishment: Array<object>
};

export const EstablishmentList = (props: PropsType) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [test, setTest] = useState(false);
  const auth = useContext(AuthContext)
  const handleTest = async() => {
    await auth.openOrCloseEstablishment(props._id, props.open)
    setTest(!test);
    // editOpen(props._id, test);
  };

  /* function editOpen(id: string, newOpen: boolean){
    const edit = props.establishment.map((item: type) => {
      if(id === Object(item)._id){
        return {...item, open: newOpen}
      }
      return item;
    })
    auth.setEst(edit);
  } */ 


  const handleOpenModalDelete = async () => {
    setOpenModalDelete(true);
    await auth.getOneEstablishment(props._id);
  };
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
        idDelete={props._id}
      />

      <Card className="m">
        <div className="open">
          <span>{test ? "Aberto" : "Fechado"}</span>
        </div>
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

          <Button
            type="button"
            variant="outlined"
            color={test ? "secondary" : "primary"}
            onClick={handleTest}
            startIcon={test ? <Lock /> : <LockOpenOutlined />}
          > 
            {test ? "Fechar" : "Abrir"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
