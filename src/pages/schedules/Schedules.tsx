import {
  Input,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useParams } from "react-router-dom";

interface appointmentsType {
  _id: string;
  name: string;
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
  const [data, setData] = useState<Array<object>>([]);
  const auth = useContext(AuthContext);
  const { serviceId } = useParams();

  return (
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
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Aristides</td>
            <td>aristidiscosta200@gmail.com</td>
            <td>Troca de óleo</td>
            <td>2022-05-31</td>
            <td>12:30</td>
            <td>Pending</td>
            <td>
              <ButtonGroup>
                <Button>Cancelar</Button>
                <Button>Aprovar</Button>
              </ButtonGroup>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
