import Footer from "./components/common/Footer"
import Menu from "./components/common/Menu"
import Inicio from "./components/Pages/Inicio"
import Sidebar from "./components/common/Sidebar";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Proveedores from "./components/Pages/Proveedores";
import FormularioNuevoProveedor from "./components/Pages/Proveedor/FormularioNuevoProveedor";
import Equipos from "./components/Pages/Equipos";
import Ordenes from "./components/Pages/Ordenes";


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
            
          </Routes>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
