import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { Establishments } from "../establishment/Establishments";
import { NewEstablishment } from "../establishment/NewEstablishment";
import { Profile } from "../profile/Profile";

export default function Home() {
  return (
    <>
      <Topbar />
      <main className="container">
        <Sidebar />
        <Routes>
          <Route index element={<Establishments/>}/>
          <Route path="new" element={<NewEstablishment />} />
          <Route path="/user/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  );
}
