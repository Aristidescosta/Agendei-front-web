import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Input,
  Button,
  ButtonGroup
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { schedules } from "../../data";


function createClientData(
  name: string,
  service: string,
  date: string,
  schedule: string,
  op: JSX.Element
) {
  return { name, service, date, schedule, op };
}



const f = schedules.map((d) => (
  createClientData(d.clientName, d.service, d.date, d.schedule,
    <ButtonGroup>
      <Button>Cancelar</Button>
      <Button>Aprovar</Button>
    </ButtonGroup>)
))



export const Schedules = () => {
  const [searchValue, setSearchValue] = useState("");
  
  function setValueOnSearchValue(event: React.ChangeEvent<HTMLInputElement>){
    setSearchValue(event.currentTarget.value.trim());
  }


  return (
    <section>
      <div>
      <Input type="search" value={searchValue} onChange={setValueOnSearchValue}/>
      <SearchOutlined />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="Tabela customizada">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Serviço</TableCell>
              <TableCell>Dia</TableCell>
              <TableCell>Horário</TableCell>   
              <TableCell>Opções</TableCell>   
            </TableRow>
          </TableHead>

          <TableBody>
            { f.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell align="center">
                  {row.service}
                </TableCell>

                <TableCell align="center">
                  {row.date}
                </TableCell>

                <TableCell align="center">
                  {row.schedule}
                </TableCell>

                <TableCell align="center">
                  {row.op}
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
