import { Route, Routes } from "react-router-dom"
import DetalleProducto from "../componentes/screen/detalleProducto/DetalleProducto"
import DondeEstamos from "../componentes/screen/dondeEstamos/DondeEstamos"
import Home from "../componentes/screen/home/Home"
import { Catalogo } from "../componentes/screen/catalogo/catologo"
import { Producto } from "../componentes/screen/producto/Producto"
import DetalleCategoria from "../componentes/screen/detalleCategoria/DetalleCategoria"

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
        <Route path="/" element={<Home />} />
        <Route path="/Catalogo/Productos" element={<Catalogo/>}/>
        <Route path="/Productos" element={<Producto imagen={""} instrumento={""} costoEnvio={""} precio={0} cantidadVendida={0} id={0} categoria={null} />} />
        <Route path="/Productos/detalle/:id" element={<DetalleProducto />}/>
        <Route path="/DondeEstamos" element={<DondeEstamos />} />
        <Route path="/categoria/instrumentos/:id" element={<DetalleCategoria />} />
      </Routes>
  )
}

export default AppRoutes
