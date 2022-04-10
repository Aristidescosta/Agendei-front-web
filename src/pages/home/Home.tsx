import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import Dashboard from "../../components/Dashboard";
import { Establishments } from "../establishment/Establishments";
import { NewEstablishment } from "../establishment/NewEstablishment";
import { Services } from "../../components/Services";
import { Profile } from "../profile/Profile";
import { Edit } from "../../components/Edit";
import {useState} from "react";
import { services, establishmentRows } from "../../data";

export default function Home() {
  const [ data, setData ] = useState(services);

  const [ dataEstablishment, setDataEstablishment ] = useState(establishmentRows);

  return (
    <>
      <Topbar />
      <main className="container">
        <Sidebar />
        <Routes>
          <Route index element={<Dashboard/>}/>
          <Route path="/establishments" element={<Establishments />} />
          <Route path="/establishments/new" element={<NewEstablishment isEstablishment={true} data={dataEstablishment} setData={setDataEstablishment}/>} />
          <Route path="/establishment/service/new" element={<NewEstablishment isEstablishment={false} data={data} setData={setData} />} />
          <Route path="/establishment/service/:id" element={<Services dataEstablishment={dataEstablishment} data={data} setData={setData}/>} />
          <Route path="/establishment/:id" element={<Edit isEditing={true} dataEstablishment={dataEstablishment} data={data} setData={setData}/>}/>
          <Route path="/user/profile" element={<Profile/>} />
          <Route path="/establishment/service/:id/edit/:ids" element={<Edit isEditing={false} dataEstablishment={dataEstablishment} data={data} setData={setData}/>} />
        </Routes>
      </main>
    </>
  );
}
 