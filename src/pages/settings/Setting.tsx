import {
  AppBar,
  Avatar,
  Box,
  Button,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import {
  Autorenew,
  Delete,
  Publish,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { IconButton, Input } from "@material-ui/core";
import React, { ChangeEvent, createContext, useContext, useState } from "react";
import logo from "../../components/assets/img/change-password-icon.jpg";
import avatar from "../../components/assets/img/profile.png";
import "./setting.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

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

interface IFormInputs {
  password: string;
  newPassword: string;
  resetNewPassword: string;
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

  console.log(picture);
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
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
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

  const auth = useContext(AuthContext)
  return (
  
    <section className="setting">
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Alterar a palavra passe</h1>
            <div>
              <Input
                type={type ? "text" : "password"}
                {...register("password")}
                placeholder="Palavra passe atual"
              />
              <span onClick={handleViewPassword}>
                {viewPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>

            <div>
              <Input
                type={type2 ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Palavra passe atual"
              />
              <span onClick={handleViewPassword2}>
                {viewPassword2 ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>
            <div>
              <Input
                type={type3 ? "text" : "password"}
                {...register("resetNewPassword")}
                placeholder="Palavra passe atual"
              />
              <span onClick={handleViewPassword3}>
                {viewPassword3 ? <Visibility /> : <VisibilityOff />}
              </span>
            </div>

            <Button
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
