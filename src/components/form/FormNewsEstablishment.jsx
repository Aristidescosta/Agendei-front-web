//Importações dos hooks
import { useApi } from "../../hooks/useApi";
import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
//Importações do Material UI
import axios from "axios";
import "./formStyle.scss"

import { AuthContext } from "../../contexts/auth/AuthContext"
import { Input, IconButton, Avatar, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { AddAPhotoOutlined, HouseRounded, PhotoCameraOutlined, Send } from "@material-ui/icons";



export const FormNewsEstablishment = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState(null);
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

  const handleChange = (event) => {
    setCategoryId(event.target.value)
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
    console.log(categoryId);
    console.log(textarea)
    /* let formData = new FormData();
    formData.append("name", data.name);
    formData.append("nif", data.nif);
    formData.append("categoryId", categoryId);
    formData.append("userId", auth.user._id);
    formData.append("number1", data.number);
    formData.append("number2", data.number2);
    formData.append("address", data.address);
    formData.append("description", textarea);
    formData.append("file", picture);
 */
    /* axios({
      method: "post",
      url: "http://192.168.42.88:3005/est/post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      //handle success
      console.log(response);
    }).catch(function (response) {
      //handle error
      console.log(response);
    }); */
  };

  const onChangePicture = (event) => {
    let url = URL.createObjectURL(event.target.files[0])
    setPicture(url)
  }

  return (
    <form className="formNewsEstablishment" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-10 col-md-10">
          <div className="row w-100">
            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input placeholder="Nome" {...field} />}
              />
            </div>

            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Controller
                name="nif"
                control={control}
                render={({ field }) => <Input placeholder="NIF" {...field} />}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Controller
                name="number"
                control={control}
                render={({ field }) => <Input placeholder="Telefone" type="number" {...field} />}
              />
            </div>

            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Controller
                name="number2"
                control={control}
                render={({ field }) => <Input placeholder="Telefone(opcional)" type="number" {...field} />}
              />
            </div>

          </div>

          <div className="row">
            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Controller
                name="address"
                control={control}
                render={({ field }) => <Input placeholder="Localização " {...field} />}
              />
            </div>
            <div className="col-md-6 col-sm-6 col-xm-12 w-100">
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="select-category">Selecione uma categoria</InputLabel>
                  <Select
                    labelId="select-category"
                    id="select"
                    value={categoryId}
                    label="Selecione uma categoria"
                    onChange={handleChange}
                  >
                    <MenuItem value="1">Lava Car</MenuItem>
                    <MenuItem value="2">Ótica</MenuItem>
                    <MenuItem value="3">Teste 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>


            </div>
          </div>
          <div className="describe .col-sm-12">
            <label htmlFor="description">Faça uma descrição</label>
            <textarea name="description" onChange={(event) => setTextarea(event.target.value)}></textarea>
          </div>
        </div>

        <div className="col-lg-2 col-md-2">
          <div className="add-est">
            <div>
              <Avatar src={picture}><HouseRounded /></Avatar>
            </div>

            <label htmlFor="icon-button-file" className="s">
              <input accept="image/*" id="icon-button-file" type="file" onChange={onChangePicture} />
              <IconButton color="primary" aria-label="Atualizar a fotografia" component="span">
                <AddAPhotoOutlined />
              </IconButton>
            </label>
          </div>
        </div>
        <Button variant="contained" className="btn" type="submit" endIcon={<Send />}>
          Enviar
        </Button>
      </div>
    </form>
  );
};
