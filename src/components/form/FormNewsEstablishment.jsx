//Importações dos hooks
import { useApi } from "../../hooks/useApi";
import { useEffect, useState, useContext } from "react";
import Select from "@material-ui/core/Select";
import { useForm, Controller } from "react-hook-form";
//Importações do Material UI

import axios from "axios";

import { AuthContext } from "../../contexts/auth/AuthContext"
import { Input, IconButton } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";


export const FormNewsEstablishment = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState();
  const [textarea, setTextarea] = useState();
  const [categoryId, setCategoryId] = useState();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const getCategory = async () => {
      const response = await api.getCategory();
      setData(response);
    };
    getCategory();
  }, []);

  function onChangeCategory(event) {
    setCategoryId(event.target.value)
    console.log(categoryId)
  }

  const list = data.map((category) => (
    <option value={category._id} key={category._id}>{category.name}</option>
  ));

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      nif: "",
      number: "",
      number2: "",
      address: "",
      description: ""
    }
  });

  const onSubmit = async data => {
    console.log(data)
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("nif", data.nif);
    formData.append("categoryId", categoryId);
    formData.append("userId", auth.user._id);
    formData.append("number1", data.number);
    formData.append("number2", data.number2);
    formData.append("address", data.address);
    formData.append("description", textarea);
    formData.append("file", picture);

    axios({
      method: "post",
      url: "http://192.168.43.227:3005/est/post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
        //handle success
        console.log(response);
      }).catch(function (response) {
        //handle error
        console.log(response);
      });
    
    /* fetch("http://192.168.43.227:3005/est/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok)
          throw new Error("não foi possível completar cadastro");

        return response.text();
      })
      .then((data) => alert(data));
 */
    /* await auth.setEstablishment(formData); */



  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="name">Nome</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="nif">Nif</label>
          <Controller
            name="nif"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="number">Telefone</label>
          <Controller
            name="number"
            control={control}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="number2">Telefone(Opcional)</label>
          <Controller
            name="number2"
            control={control}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </div>

      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="address">Localização</label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description">Descrição</label>
          <textarea name="description" onChange={(event) => setTextarea(event.target.value)}></textarea>
        </div>
      </div>

      <label htmlFor="icon-button-file">
      <Input accept="image/*" id="icon-button-file" type="file" onChange={(event) => setPicture(event.target.files[0])}/>
        <IconButton color="primary" aria-label="Atualizar a fotografia" component="span">
          <PhotoCamera/>
        </IconButton>
      </label>  
      <select onChange={(event) => onChangeCategory(event)} name="" id="">
        {list}
      </select>
      <button type="submit">Enviar</button>
    </form>
  );
};
