//Importações dos hooks
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import React, { useEffect, useState, useContext } from "react";

//Importação do contexto
import { AuthContext } from "../../contexts/auth/AuthContext";

import Select, { Options } from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
//Importações do Material UI
import { Input, Checkbox, IconButton, Button } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";

interface IFormInput {
  categoryId: string;
  name: string;
  nif: number;
  img: string;
  categoryTypes: {label: string, value: string};
  phone_number: Array<number>;
  open_to: {
    segunda: false;
    terca: false;
    quarta: false;
    quinta: false;
    sexta: false;
    sabado: false;
    domingo: false;
  }
}

interface options {
  _id: string,
  name: string
}

export const FormNewsEstablishment = () => {
  const auth = useContext(AuthContext);
  const api = useApi();
  const navigate = useNavigate();
  const [data, setData] = useState<[]>([]);
  const [picture, setPicture] = useState("");
  const [category, setCategory] = useState("");
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const getCategory = async () => {
      const response = await api.getCategory();
      setData(response);
    };
    getCategory();
  }, []);
  console.log(typeof data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="categoryTypes"
        control={control}
        render={({ field }) => (
          <select
            className="form-control"
            id="select"
          >
                      
          </select>
        )}
      />
      <input type="submit" />
    </form>
  );
};
