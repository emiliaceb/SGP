import Footer from "./components/common/Footer"
import Menu from "./components/common/Menu"
import Inicio from "./components/Pages/Inicio"
import Sidebar from "./components/common/Sidebar";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Proveedores from "./components/Pages/Proveedores";
import FormularioNuevoProveedor from "./components/Pages/Proveedor/FormularioNuevoProveedor";
import Equipos from "./components/Pages/Equipos";
import Ordenes from "./components/Pages/Ordenes";
import Contratos from "./components/Pages/Contratos";
import Calificaciones from "./components/Pages/Calificaciones"; 
import Tecnicos from "./components/Pages/Tecnicos";
import Reclamos from "./components/Pages/Reclamos";
import Intervenciones from "./components/Pages/Intervenciones";
import Auditoria from "./components/Pages/Auditoria";



function App() {

  return (
    <>
    <BrowserRouter>
      <Menu />

      {/* Layout: sidebar a la izquierda y rutas en el main a la derecha */}
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/proveedores/formularionuevoproveedor" element={<FormularioNuevoProveedor />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/calificaciones" element={<Calificaciones />} />
            <Route path="/tecnicos" element={<Tecnicos />} />
            <Route path="/reclamos" element={<Reclamos />} />
            <Route path="/intervenciones" element={<Intervenciones />} />
            <Route path="/auditoria" element={<Auditoria />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
