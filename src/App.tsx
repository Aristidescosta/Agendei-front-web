import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import Home from "./pages/home/Home";

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
    </Routes>
  );
}

export default App;
