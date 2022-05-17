import React, { useState } from "react";
import {
  Modal,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from "@material-ui/core";

type propsType = {
  handleOpenModalInfo: () => void;
  setOpenModalInfo: React.Dispatch<React.SetStateAction<boolean>>;
  openModalInfo: boolean;
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export const ModalInfo = (props: propsType) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const handleCloseModalInfo = () => props.setOpenModalInfo(false);

  return (
    <Modal
      id="modal-edit"
      open={props.openModalInfo}
      onClose={handleCloseModalInfo}
      aria-labelledby="modal-info-title"
      aria-describedby="modal-info-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Cria uma palavra-passe forte</h2>
        
        <div id="simple-modal-description">
          <br /><p>Quando criares a tua palavra-passe, lembra-te do seguinte:</p>
          
          <br /><ul>
            <li>
              <strong>Não deve</strong> conter o teu nome.
            </li>
            <li>
              <strong>Não deve</strong> conter uma palavra comum do dicionário.
            </li>
            <li>
              <strong>Deve</strong> conter um ou mais números.
            </li>
            <li>
              <strong>Deve</strong> conter letras maiúsculas e minúsculas.
            </li>
            <li>
              <strong>Deve</strong> ter, pelo menos, 8 carateres.
            </li>
          </ul>
          <Button variant="contained" onClick={handleCloseModalInfo} className="btn">
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};
