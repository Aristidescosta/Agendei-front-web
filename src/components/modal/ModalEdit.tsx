import React from "react";
import { Modal } from "@material-ui/core";
import { FormNewsEstablishment } from "../form/FormNewsEstablishment";

type propsType = {
  handleOpenModalEdit: () => void;
  setOpenModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  openModalEdit: boolean;
};

export const ModalEdit = (props: propsType) => {
  const handleCloseModalEdit = () => props.setOpenModalEdit(false);

  return (
    <Modal
      id="modal-edit"
      open={props.openModalEdit}
      onClose={handleCloseModalEdit}
      aria-labelledby="modal-edit-title"
      aria-describedby="modal-modal-description"
    >
      <FormNewsEstablishment/> 
    </Modal>
  );
};
