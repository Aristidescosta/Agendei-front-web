import { AppBar, Avatar, Box, Button, Tab, Tabs } from "@material-ui/core";
import {
  Autorenew,
  Delete,
  Publish,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { IconButton, Input } from "@material-ui/core";
import React, { ChangeEvent, useContext, useState } from "react";
import logo from "../../components/assets/img/change-password-icon.jpg";
import avatar from "../../components/assets/img/profile.png";
import "./setting.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { dev } from "../../config/config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userEmail, userPassword } from "../../utils/validations";
import { InputError } from "../../components/InputErrors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

interface IFormInput {
  currentPassword: string;
  newPassword: string;
  resetNewPassword: string;
  password: string;
}

const myYupResolver = yup
  .object({
    currentPassword: yup
      .string()
      .required()
      .min(8)
      .max(20)
      .matches(userPassword),
    newPassword: yup.string().required().min(8).max(20).matches(userPassword),
    resetNewPassword: yup
      .string()
      .required()
      .min(8)
      .max(20)
      .matches(userPassword),
    password: yup.string().required().min(8).max(20).matches(userPassword),
  })
  .required();

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function Setting() {
  const [value, setValue] = useState(1);
  const [picture, setPicture] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const [viewPassword2, setViewPassword2] = useState(true);
  const [viewPassword3, setViewPassword3] = useState(true);
  const [type, setType] = useState(false);
  const [type2, setType2] = useState(false);
  const [type3, setType3] = useState(false);

  
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
    setType(!type);
  };

  const handleViewPassword2 = () => {
    setViewPassword2(!viewPassword2);
    setType2(!type2);
  };

  const handleViewPassword3 = () => {
    setViewPassword3(!viewPassword3);
    setType3(!type3);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(myYupResolver) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let id = toast.loading("Salvando alterações");
    console.log(data)
  };

  const handleSubmitValues: SubmitHandler<IFormInput> = () => {
    console.log("data")
  };

  const onChangePicture = (event: any) => {
    let url = URL.createObjectURL(event.target.files[0]);
    setPicture(url);
  };

  const removePicture = (event: any) => {
    setPicture("");
  };

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const auth = useContext(AuthContext);
  return (
    <section className="setting">
      
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />

      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">Configurações</li>
      </ol>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Editar Perfil" {...a11yProps(0)} />
          <Tab label="Alterar Palavra Passe" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="buttons">
          <span>Imagem de perfil</span>
          <div>
            <Avatar
              src={picture === "" ? avatar : picture}
              alt="Imagem do perfil do usário"
            />
            <div>
              <label htmlFor="icon-button-file" className="s">
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={onChangePicture}
                />
                <IconButton
                  color="default"
                  aria-label="Atualizar a fotografia"
                  component="span"
                >
                  <Publish />
                </IconButton>
              </label>

              <Button
                id="removePicture"
                color="secondary"
                onClick={removePicture}
              >
                <Delete />
              </Button>
            </div>
          </div>
        </div>

        <div className="information">
          <div>
            <label>Nome: </label>
            <Input type="text" value={auth.user?.username} placeholder="Nome" />
          </div>

          <div>
            <label>Email: </label>
            <Input type="email" value={auth.user?.email} placeholder="Nome" />
          </div>

          <Button
            variant="contained"
            size="large"
            color="default"
            endIcon={<Autorenew />}
          >
            Salvar alterações
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <aside>
          <img src={logo} alt="Imagem exibindo uma troca de password" />
        </aside>

        <section>
          <form onSubmit={handleSubmit(handleSubmitValues)}>
            <h1>Alterar a palavra passe</h1>
            <div className="erros-flex">
              <div className="t">
                <Input
                  type={type ? "text" : "password"}
                  {...register("currentPassword")}
                  placeholder="Palavra passe atual"
                />
                <span onClick={handleViewPassword}>
                  {viewPassword ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              {errors.currentPassword?.message && (
                <InputError
                  type={errors.currentPassword.type}
                  field="password2"
                />
              )}
            </div>

            <div className="erros-flex">
              <div className="t">
                <Input
                  type={type2 ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="Palavra passe atual"
                />
                <span onClick={handleViewPassword2}>
                  {viewPassword2 ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              {errors.newPassword?.message && (
                <InputError type={errors.newPassword.type} field="password" />
              )}
            </div>

            <div className="erros-flex">
              <div className="t">
                <Input
                  type={type3 ? "text" : "password"}
                  {...register("resetNewPassword")}
                  placeholder="Palavra passe atual"
                />
                <span onClick={handleViewPassword3}>
                  {viewPassword3 ? <Visibility /> : <VisibilityOff />}
                </span>
              </div>
              {errors.resetNewPassword?.message && (
                <InputError
                  type={errors.resetNewPassword.type}
                  field="password"
                />
              )}
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              color="default"
              endIcon={<Autorenew />}
            >
              Salvar alterações
            </Button>
          </form>
        </section>
      </TabPanel>
    </section>
  );
}

export default Setting;
