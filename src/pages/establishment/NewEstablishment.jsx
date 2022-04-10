import { Avatar } from "@material-ui/core";
import { Publish } from "@material-ui/icons";
import "../../styles/newEstablishment.scss";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useApi } from "../../hooks/useApi";

const valuesState = () => {
  return {
    value1: false,
    value2: false,
    value3: false,
    value4: false,
    value5: false,
    value6: false,
    value7: false,
  };
};

const initialAddress = () => {
  return{
    bairro: "",
    rua: "",
  }
}

const initialFoneNumber = () =>{
  return{
    number: "",
    number2: "",
  }
}

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
  const auth = useContext(AuthContext);
  const api = useApi();
  const [values, setValues] = useState(initialState);
  const [phoneNumber, setPhoneNumber] = useState(initialFoneNumber);
  const [address, setAddress] = useState(initialAddress);
  const [valuesCheck, setValuesCheck] = useState(valuesState);
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  const userId = auth.user._id;
  const handleSubmit = async () =>{
    await api.setEstablishment(values.establishmentName, values.nif, category, userId, address, phoneNumber, valuesCheck)
  }

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
      categoryValue: category,
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

  const onChangePhoneNumber = (event) => {
    const { value, name } = event.target;
    setPhoneNumber({
      ...phoneNumber,
      [name]: value,
    });
  };

  const onChangeAddress = (event) => {
    const { value, name } = event.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const onChangeCheck = (event) => {
    const { name, checked } = event.target;
    setValuesCheck({
      ...valuesCheck,
      [name]: checked,
    });
  };

  const onChangeSelect = (e) => {
    setCategory(e.target.value);
  };

  
  useEffect(() => {
    const getCategory = async () => {
      const response = await api.getCategory();
      setData(response);
    };
    getCategory();
  }, []);

  const categoryList = data.map((category) => (
    <option
      onChange={onChangeSelect}
      name="categoryName"
      key={category._id}
      value={category._id}
    >
      {category.name}
    </option>
  ));


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

      <div className="row">
        <div className="col-md-6">
          <p>Nome do estabelecimento</p>
          <input
            className="form-control"
            type="text"
            onChange={onChange}
            value={values.establishmentName}
            name="establishmentName"
            placeholder="Digite aqui o nome"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="nif">Nif</label>
          <input
            className="form-control"
            type="text"
            onChange={onChange}
            value={values.nif}
            name="nif"
            placeholder="Digite aqui o nome"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <p>Nº de telefone</p>
          <input
            className="form-control"
            type="number"
            onChange={onChangePhoneNumber}
            value={phoneNumber.number}
            name="number"
          />
        </div>

        <div className="col-md-6">
          <p>Nº de telefone 2(opcional)</p>
          <input
            className="form-control"
            type="number"
            onChange={onChangePhoneNumber}
            value={phoneNumber.number2}
            name="number2"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <p>Selecione os dias</p>
          <input
            value={valuesCheck.value1}
            name="value1"
            type="checkbox"
            onChange={onChangeCheck}
          />
          <label htmlFor="">Segunda-Feira</label>
          <input
            type="checkbox"
            name="value2"
            onChange={onChangeCheck}
            value={valuesCheck.value2}
          />
          <label htmlFor="">Terça-Feira</label>

          <input
            type="checkbox"
            name="value3"
            onChange={onChangeCheck}
            value={valuesCheck.value3}
          />
          <label htmlFor="">Quarta-Feira</label>

          <input
            type="checkbox"
            name="value4"
            onChange={onChangeCheck}
            value={valuesCheck.value4}
          />
          <label htmlFor="">Quinta-Feira</label>

          <input
            type="checkbox"
            name="value5"
            onChange={onChangeCheck}
            value={valuesCheck.value5}
          />
          <label htmlFor="">Sexta-Feira</label>

          <input
            type="checkbox"
            name="value6"
            onChange={onChangeCheck}
            value={valuesCheck.value6}
          />
          <label htmlFor="">Sábado</label>

          <input
            type="checkbox"
            name="value7"
            onChange={onChangeCheck}
            value={valuesCheck.value7}
          />
          <label htmlFor="">Domingo</label>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <label htmlFor="location">Bairro</label>
          <input
            className="form-control"
            type="text"
            onChange={onChangeAddress}
            value={address.bairro}
            name="bairro"
            placeholder="Digite aqui o nome do bairro"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="location">Rua</label>
          <input
            className="form-control"
            type="text"
            onChange={onChangeAddress}
            value={address.rua}
            name="rua"
            placeholder="Digite aqui o nome da rua"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <select
            onChange={onChangeSelect}
            className="form-control"
            id="select"
          >
            <option value="" selected>
              Selecione uma categoria
            </option>
            {categoryList}
          </select>
        </div>
      </div>
      <Button onClick={addEstablishment} className="button">
        Criar Estabelecimento
      </Button>
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
      <button  className="button">
        Criar Serviço
      </button>
    </>
  );

  return (
    <section className="newEstablishment">
      {props.isEstablishment ? newEstablishmentTemplate : newServiceTemplate}
    </section>
  );
};
