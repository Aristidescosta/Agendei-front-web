import React, { useContext } from "react";
import { Button, Typography, Modal, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Cancel, Done } from "@material-ui/icons";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useParams } from "react-router-dom";

type propsType = {
  handleOpenModalDelete: () => void;
  setOpenModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  openModalDelete: boolean;
  idDelete: string;
}; 

const ModalDeleted = (props: propsType) => {
  const auth = useContext(AuthContext);
  const handleCloseModalDelete = () => props.setOpenModalDelete(false);
  const deleteEstablishment = async () => {
    console.log(props.idDelete);
    if (props.idDelete) {
      const response = await auth.deletedService(props.idDelete);
      if (response) {
        window.location.reload();
      }
    }
  };
  return (
    <Modal
      open={props.openModalDelete}
      onClose={handleCloseModalDelete}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box id="box1">
        <div id="modal-modal-title">
          <DeleteIcon className="deleteIcon" />
          Este processo é irreversível, deseja continuar?
        </div>
        <Typography id="modal-modal-description">
          <Button
            type="button"
            onClick={handleCloseModalDelete}
            color="secondary"
            variant="outlined"
            startIcon={<Cancel />}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            onClick={deleteEstablishment}
            color="primary"
            variant="outlined"
            startIcon={<Done />}
          >
            Confirmar
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalDeleted;
