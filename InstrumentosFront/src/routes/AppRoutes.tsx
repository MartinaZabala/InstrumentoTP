import { Route, Routes } from "react-router-dom"
import DetalleProducto from "../componentes/screen/detalleProducto/DetalleProducto"
import DondeEstamos from "../componentes/screen/dondeEstamos/DondeEstamos"
import Home from "../componentes/screen/home/Home"
import { Catalogo } from "../componentes/screen/catalogo/catologo"
import DetalleCategoria from "../componentes/screen/detalleCategoria/DetalleCategoria"
import DetalleCarrito from "../componentes/screen/detalleCarrito/detalleCarrito"
import Producto from "../componentes/screen/producto/Producto"
import { ProductoParams } from "../componentes/screen/carrito/carrito"


const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
        <Route path="/" element={<Home />} />
        <Route path="/Catalogo/Productos" element={<Catalogo/>}/>
        <Route path="/Productos" element={<Producto id={0} imagen={""} instrumento={""} precio={0} costoEnvio={""} cantidadVendida={0} categoria={null} cantidad={0} onGuardarCarrito={function (items: ProductoParams[]): void {
        throw new Error("Function not implemented.")
      } } />} />
        <Route path="/Productos/detalle/:id" element={<DetalleProducto />}/>
        <Route path="/DondeEstamos" element={<DondeEstamos />} />
        <Route path="/categoria/instrumentos/:id" element={<DetalleCategoria />} />
        <Route path="/detalleCarrito" element={<DetalleCarrito detallePedidos={[]} onSubmitPedido={function (): void {
        throw new Error("Function not implemented.")
      } }/>} />
      </Routes>
  )
}

export default AppRoutes
