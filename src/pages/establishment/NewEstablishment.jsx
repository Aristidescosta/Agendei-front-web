import { Input, Checkbox , IconButton} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import "../../styles/newEstablishment.scss";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useApi } from "../../hooks/useApi";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";



export const NewEstablishment = (props) => {
  const auth = useContext(AuthContext);
  const api = useApi();
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getCategory = async () => {
      const response = await api.getCategory();
      setData(response);
    };
    getCategory();
  }, [api]);

  const categoryList = data.map((category) => (
    <option
      name="categoryName"
      key={category._id}
      value={category._id}
    >
      {category.name}
    </option>
  ));

  const onChangeSelect = (e) => {
    setCategory(e.target.value);
    console.log(category)
  };

  const onChangePicture = e => {
    setPicture(e.target.files[0]);
    console.log(picture);
  }

  const { control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      img: {},
      open_to: {
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false,
        domingo: false,
      },
      address: {
        rua: "",
        bairro: "",
      },
      name: '',
      nif: '',
      phone_number: [],
    }
  });

  const onSubmit = data => {

  };

  const newEstablishmentTemplate = (
    <>
      <div>
        <h1>Adicionar novo estabelecimento</h1>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/establishments">Estabelecimentos</Link>
          </li>
          <li className="breadcrumb-item">Novo</li>
        </ol>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">Nome do estabelecimento</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="nif">Nif do estabelecimento</label>
            <Controller
              name="nif"
              control={control}
              rules={{ minLength: 3 }}
              render={({ field }) => <Input {...field} required />}

            />
            {errors.nif && <div className="error_msg">No mínimo 8 caracteres</div>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="number1">Nº de telefone(activo)</label>
            <Controller
              name="phone_number[0]"
              control={control}
              render={({ field }) => <Input {...field} type="number" required />}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="number2">Nº de telefone(opcional)</label>
            <Controller
              name="phone_number[1]"
              control={control}
              render={({ field }) => <Input {...field} type="number" />}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <p>Selecione os dias</p>
            <label htmlFor="segunda">Segunda</label>
            <Controller
              name="open_to.segunda"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />

            <label htmlFor="terca">Terça-Feira</label>
            <Controller
              name="open_to.terca"
              control={control}
              render={({ field }) => <Checkbox type="checkbox" color="default" />}
            />

            <label htmlFor="quarta">Quarta-feira</label>
            <Controller
              name="open_to.quarta"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />

            <label htmlFor="quinta">Quinta-Feira</label>
            <Controller
              name="open_to.quinta"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />

            <label htmlFor="sexta">Sexta-Feira</label>
            <Controller
              name="open_to.sexta"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />

            <label htmlFor="sabado">Sábado</label>
            <Controller
              name="open_to.sabado"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />

            <label htmlFor="domingo">Domingo</label>
            <Controller
              name="open_to.domingo"
              control={control}
              render={({ field }) => <Checkbox {...field} type="checkbox" color="default" />}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div>Selecione a categoria</div>
            <Controller
              name="open_to.terca"
              control={control}
              render={({ field }) => <select onChange={onChangeSelect}
                className="form-control"
                id="select">
                {categoryList}
              </select>}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" onChange={onChangePicture}/>
              <IconButton color="primary" aria-label="upload picture" componente="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name">Rua</label>
            <Controller
              name="address.rua"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="name">Bairro</label>
            <Controller
              name="address.bairro"
              control={control}
              render={({ field }) => <Input {...field} required />}
            />
          </div>
        </div>

        <Button type="submit" className="button">
          Criar novo Estabelecimento
        </Button>
      </form>
    </>
  );

  return (
    <section className="newEstablishment">
      {newEstablishmentTemplate}
    </section>
  );
};
