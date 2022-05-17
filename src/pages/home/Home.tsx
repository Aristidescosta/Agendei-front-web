import { Routes, Route } from "react-router-dom";
import { Topbar } from "../../components/Topbar";
import Account from "../account/Account";
import { Edit } from "../establishment/Edit";
import { EstablishmentDetails } from "../establishment/EstablishmentDetails";
import { Establishments } from "../establishment/Establishments";
import { NewEstablishment } from "../establishment/NewEstablishment";
import { Schedules } from "../schedules/Schedules";
import { Service } from "../services/Service";
import Setting from "../settings/Setting";
import "./home.scss";

export default function Home() {
  return (
    <>
      <Topbar />
      <main>
        <Routes>
          <Route index element={<Establishments />} />
          <Route path="new" element={<NewEstablishment />} />
          <Route path="user/setting" element={<Setting />} /> 
          <Route path="user/account" element={<Account />} />
          <Route path="establishment/:id" element={<EstablishmentDetails />} />
          <Route path="establishment/:id/services" element={<Service />} />
          <Route
            path="establishment/service/:id/:schedulesId/schedules"
            element={<Schedules />}
          />
          <Route path="establishment/:id/edit" element={<Edit />} />
        </Routes>
      </main>
    </>
  );
}
