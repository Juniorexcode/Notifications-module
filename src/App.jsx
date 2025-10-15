import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Departamentos from "./pages/Departamentos";
import Modulos from "./pages/Modulos";
import Plantillas from "./pages/Plantillas";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/plantillas" element={<Plantillas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
