import { Input, Button, ButtonGroup } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useParams } from "react-router-dom";
import { Preloader } from "../../components/preloader/Index";

interface appointmentsType {
  _id: string;
  client: {
    name: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
    preco: string;
  };
  date: Date;
}

export const Schedules = () => {
  const [searchValue, setSearchValue] = useState("");
  const [establishment, setEstablishment] = useState<Array<object> | void>();
  const auth = useContext(AuthContext);
  const { serviceId } = useParams();
  useEffect(() => {
    const getAppointments = async () => {
      if (serviceId) {
        const response = await auth.getAppointments(serviceId);
        setEstablishment(response);
      }
    };
    getAppointments();
  }, []);

  return (
    <>
      {!establishment ? (
        <Preloader />
      ) : (
        <section className="schedule">
          <div>
            <Input type="search" value={searchValue} />
            <SearchOutlined />
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Serviço</th>
                <th>Preço</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Status</th>
                <th>Opções</th>
              </tr>
            </thead>

            <tbody>
              {Object(establishment).map((list: appointmentsType) => (
                <tr>
                  <td>{list.client.name}</td>
                  <td>{list.client.email}</td>
                  <td>{list.service.name}</td>
                  <td>{list.service.preco}</td>
                  <td>{list.date}</td>
                  <td>Pending</td>
                  <td>
                    <ButtonGroup>
                      <Button>Cancelar</Button>
                      <Button>Aprovar</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};
