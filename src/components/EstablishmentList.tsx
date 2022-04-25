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
  Modal,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Cancel, Done } from "@material-ui/icons";

type PropsType = {
  id: string;
  img: string;
  name: string;
  nif: number;
  address: {
    bairro: string;
    rua: number;
  };
};

export const EstablishmentList = (props: PropsType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="box1">
          <div id="modal-modal-title">
            <DeleteIcon className="deleteIcon" />
            Eliminar esse estabelecimento?
          </div>
          <Typography id="modal-modal-description">
            <Button
              type="button"
              onClick={handleClose}
              color="secondary"
              variant="outlined"
              startIcon={<Cancel />}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              onClick={handleClose}
              color="primary"
              variant="outlined"
              startIcon={<Done />}
            >
              Confirmar
            </Button>
          </Typography>
        </Box>
      </Modal>

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
            Localizção
            <br />
            Bairro: {props.address.bairro} <br />
            Rua: {props.address.rua}
            <br />
            Nº de NIF: {props.nif}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={"/establishment/" + props.id}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Atualizar
            </Button>
          </Link>

          <Link to={"/establishment/service/" + props.id}>
            <Button type="button" variant="outlined" color="primary">
              Serviços
            </Button>
          </Link>

          <Link to="#modal">
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleOpen}
              startIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};
