import "../../styles/establishment.scss";
import { Close, InfoSharp } from "@material-ui/icons";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { EstablishmentList } from "../../components/EstablishmentList";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useApi } from "../../hooks/useApi";

export const Establishments = () => {
  const api = useApi();
  const [ dataEstablishment, setDataEstablishment] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(false);
  };

  const auth = useContext(AuthContext);

  useEffect(() =>{
    const getEstablishment = async() =>{ 
      const response = await api.getEstablishment(auth.user._id)
      setDataEstablishment(response);
    }
    getEstablishment();
  }, []);

  const deletedEstablishment = (id) => {
    /* Primeiro deverá ser disparado uma mensagem de confirmação */
    alert("Este estabelecimento será eliminado!");
    const remainingEstablishment = dataEstablishment.filter(
      (establishment) => id !== establishment.id
    );
    setDataEstablishment(remainingEstablishment);
  };

  const establishmentList = dataEstablishment.map((datas) => (
    <EstablishmentList
      id={datas._id}
      img={ "https://teste-api-api.herokuapp.com/" +datas.img}
      name={datas.name}
      nif={datas.nif}
      address={datas.address}
      key={datas._id}
    />
  ));

    if(
      dataEstablishment.length === 0
    ){
      return <h1>Processando</h1>
    }

  console.log(dataEstablishment.length === 0);

  return (
    <section className="establishment">
      <h1 className="establishment-title">
        Nº total de estabelecimentos:
        <small className="establishment-sub">{dataEstablishment.length}</small>
      </h1>

      <div className={showAlert ? "alert-info show" : "alert-info hidden"}>
        <button onClick={handleClick}>
          <Close />
        </button>
        <span>
          <InfoSharp />
          <strong>Agendei admin</strong> novo estabelecimento adicionado com
          sucesso.
        </span>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <Link to="/establishments/new" className="card-body establishmentAdd">
              <h1>+</h1>
            </Link>
          </div>
        </div>

        {establishmentList}
      </div>
    </section>
  );
};
