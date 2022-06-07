import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import { ConfirmCodeReset } from "./pages/confirmCode/IndexConfirm";
import { ConfirmCode } from "./pages/confirmCode/Index";
import { ChangePassword } from "./pages/changePassword/Index";
import Home from "./pages/home/Home";
import { Signup } from "./pages/login/Signup";
import { VerifyEmail } from "./pages/verifyEmail/Index";
import { SignPreloader } from "./components/preloader/SignPreloader";

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
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/resetPassword" element={<ConfirmCodeReset />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/preloader" element={<SignPreloader />} />
    </Routes>
  );
}

export default App;
