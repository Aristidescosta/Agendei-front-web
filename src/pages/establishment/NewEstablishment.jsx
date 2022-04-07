import { Avatar } from "@material-ui/core";
import avatar from "../../components/assets/img/user.jpg";
import { Publish } from "@material-ui/icons";
import "../../styles/newEstablishment.scss";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const initialState = () => {
  return {
    serviceName: "",
    priceValue: "",
    establishmentName: "",
    nif: "",
    location: "",
  };
};

export const NewEstablishment = (props) => {
  const [values, setValues] = useState(initialState);
  const [category, setCategory] = useState("");
  const addService = () => {
    const newService = {
      id: props.data.length + 1,
      serviceName: values.serviceName,
      preco: values.priceValue + ".00kzs",
      clientes: 0,
    };
    props.setData([...props.data, newService]);
    window.history.back();
  };

  const addEstablishment = () => {
    const newEstablishment = {
      id: props.data.length + 1,
      establishmentName: values.establishmentName,
      services: 0,
      categoryValue: category
    };
    props.setData([...props.data, newEstablishment]);
    window.history.back();
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onChangeSelect = (e) => {
    setCategory(
      e.target.value
    );
  };

  const categoryList = props.data.map((category) => (
    <option
      onChange={onChange}
      name="categoryName"
      key={category.id}
      value={category.categoryValue}
    >
      {category.establishmentName}
    </option>
  ));

  console.log(props.data);

  const newEstablishmentTemplate = (
    <>
      <div>
        <h1>Adicionar novo estabelecimento</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/establishments">Estabelecimentos</Link>
          </li>
          <li class="breadcrumb-item">Novo</li>
        </ol>
      </div>

      <div className="establishment-description">
        <div className="establishmentLeft">
          <div>
            <label htmlFor="establishmentName">Nome</label>
            <input
              type="text"
              onChange={onChange}
              value={values.establishmentName}
              name="establishmentName"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <label htmlFor="nif">Nif</label>
            <input
              type="text"
              onChange={onChange}
              value={values.nif}
              name="nif"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              onChange={onChange}
              value={values.location}
              name="location"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <select onChange={onChangeSelect} id="select">
              <option value="" selected>
                Selecione uma categoria
              </option>
              {categoryList}
            </select>
          </div>
        </div>
      </div>
      <Button onClick={addEstablishment} className="button">Criar Estabelecimento</Button>
    </>
  );

  const newServiceTemplate = (
    <>
      <div>
        <h1>Adicionar novo serviço</h1>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item">
            <Link to="/establishments">Estabelecimentos</Link>
          </li>
          <li class="breadcrumb-item">Serviços</li>
          <li class="breadcrumb-item">Novo</li>
        </ol>
      </div>

      <div className="establishment-description">
        <div className="establishmentLeft">
          <div>
            <label htmlFor="name">Nome do serviço</label>
            <input
              type="text"
              name="serviceName"
              onChange={onChange}
              value={values.serviceName}
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <label htmlFor="name">Valor do serviço</label>
            <input
              type="number"
              name="priceValue"
              onChange={onChange}
              value={values.priceValue}
              placeholder="Digite aqui o nome"
            />
          </div>
        </div>
      </div>
      <Button onClick={addService} className="button">
        Criar Serviço
      </Button>
    </>
  );

  return (
    <section className="newEstablishment">
      {props.isEstablishment ? newEstablishmentTemplate : newServiceTemplate}
    </section>
  );
};
