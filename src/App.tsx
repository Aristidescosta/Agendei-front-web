import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import { Index } from "./pages/confirmCode/Index";
import Home from "./pages/home/Home";
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
      <Route path="/confirmCode" element={<Index />} />
    </Routes>
  );
}

export default App;
