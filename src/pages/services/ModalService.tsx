import React, { ChangeEvent, useRef, useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "../../components/InputErrors";
import { SubmitHandler, useForm } from "react-hook-form";
import { userHourType } from "../../utils/validations";

interface hourTypeProps {
  serviceName: string;
  servicePreco: string;
  hourType: string;
  containerHours: string;
}

/* Yup register */
const myYupResolver = yup
  .object({
    hourType: yup.string().matches(userHourType),
    serviceName: yup.string().required(),
    servicePreco: yup.string().required(),
    containerHours: yup.string().required(),
  })
  .required();

type propsType = {
  handleOpenModalCreate: () => void;
  setOpenModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCreate: boolean;
};

export const ModalService = (props: propsType) => {
  const handleCloseModalCreate = () => props.setOpenModalCreate(false);
  const [timeValue, setTimeValue] = useState("");
  const [error, setError] = useState(false);
  const [times, setTimes] = useState<Array<string>>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<hourTypeProps>({ resolver: yupResolver(myYupResolver) });

  const onSubmit: SubmitHandler<hourTypeProps> = (data) => {
    console.log(data);
  };

  const onChangeTime = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeValue(event.currentTarget.value);
  };

  const addTime = () => {
    if (timeValue.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      setError(false);
      setTimes([...times, timeValue]);
      setTimeValue("");
    } else setError(true);
    if (inputEl && inputEl.current) inputEl.current.focus();
  };

  return (
    <Modal
      id="modal-create"
      open={props.openModalCreate}
      onClose={handleCloseModalCreate}
      aria-labelledby="modal-create-title"
      aria-describedby="modal-modal-description"
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <TextField
              {...register("serviceName")}
              id="standard-basic"
              label="Nome do serviço"
            />
            {errors.serviceName?.message && (
              <InputError type={errors.serviceName.type} field="serviceName" />
            )}
          </div>
          <div className="col-md-6">
            <TextField
              {...register("servicePreco")}
              id="standard-basic"
              label="Preço do produto"
            />
            {errors.servicePreco?.message && (
              <InputError
                type={errors.servicePreco.type}
                field="servicePreco"
              />
            )}
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  onChange={onChangeTime}
                  value={timeValue}
                  ref={inputEl}
                  label="Adicionar horário"
                />
                {error ? (
                  <span className="field-error">Formato de hora incorreto</span>
                ) : (
                  <span></span>
                )}
              </div>
              <div className="col-md-6">
                <Button
                  onClick={addTime}
                  type="button"
                  variant="outlined"
                  color="primary"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <textarea value={times} {...register("containerHours")}></textarea>
            {errors.containerHours?.message && (
              <InputError
                type={errors.containerHours.type}
                field="containerHour"
              />
            )}
          </div>
          <div className="col-md-12">
            <Button type="submit" variant="outlined" color="primary">
              Criar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
