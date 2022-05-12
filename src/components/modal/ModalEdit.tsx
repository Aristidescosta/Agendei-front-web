import React from "react";
import { Modal } from "@material-ui/core";
import { FormEdit } from "../form/FormEdit";

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
      <FormEdit />
    </Modal>
  );
};
