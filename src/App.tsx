import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import Home from "./pages/home/Home";
import { ConfirmCode } from "./pages/login/ConfirmCode";
import { Signup } from "./pages/login/Signup";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/confirmCode" element={<ConfirmCode />} />
    </Routes>
  );
}

export default App;
