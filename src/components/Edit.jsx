import "../styles/newEstablishment.scss";
import { Button } from "../components/Button";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export const Edit = ({dataEstablishment ,data, setData, isEditing }) => {
  const { ids,id } = useParams();
  const [ values, setValues ] = useState(dataEstablishment);
  const onChangeName = (e) => {
    e.preventDefault();
  };

  const onChangePrice = (e) => {
    e.preventDefault();
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const categoryList = values.map((category) => (
    <option
      onChange={onChange}
      name="categoryName"
      key={category.id}
      value={category.categoryValue}
    >
      {category.establishmentName}
    </option>
  ));

  const editService = (id, newName, newPreco) => {
    const editService = data.map((service) => {
      //Se a tarefa tiver o mesmo id
      if (id === service.id) {
        return { ...service, preco: newPreco, serviceName: newName };
      }

      return service;
    });
    setData(editService);
    window.history.back();
  };

  const isEditingEstablishment = (
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
              value={dataEstablishment[id - 1].establishmentName}
              name="establishmentName"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <label htmlFor="nif">Nif</label>
            <input
              type="text"
              onChange={onChange}
              value={dataEstablishment[id - 1].nif}
              name="nif"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <label htmlFor="location">Localização</label>
            <input
              type="text"
              onChange={onChange}
              value={dataEstablishment[id - 1].location}
              name="location"
              placeholder="Digite aqui o nome"
            />
          </div>

          <div>
            <select /* onChange={onChangeSelect} */ id="select">
              {categoryList}
            </select>
          </div>
        </div>
      </div>
      <Button className="button">
        Criar Estabelecimento
      </Button>
    </>
  );

  const isEditingService = (
    <section className="newEstablishment">
      <h1>Editando</h1>
      {/* <div>
        <h1>{data[ids - 1].serviceName}</h1>
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
            <input type="text" onChange={onChangeName} value={name} />
          </div>

          <div>
            <label htmlFor="name">Valor do serviço</label>
            <input type="text" onChange={onChangePrice} value={preco} />
          </div>
        </div>
      </div>
      <Button onClick={() => editService(ids, name, preco)} className="button">
        Criar Serviço
      </Button> */}
    </section>
  );

  return (
    <section className="newEstablishment">
      {isEditing ? isEditingEstablishment : isEditingService}
    </section>
  );
};
