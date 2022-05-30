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
          <Route path="establishment/:estId" element={<EstablishmentDetails />} />
          <Route path="establishment/:estId/edit" element={<Edit />} />
          <Route path="establishment/:estId/services" element={<Service />} />
          <Route
            path="establishment/:estId/services/:serviceId/schedules"
            element={<Schedules />}
          />
          <Route path="user/setting" element={<Setting />} />
          <Route path="user/account" element={<Account />} />
        </Routes>
      </main>
    </>
  );
}
