import React, { useEffect, useState } from "react";
import Carrito, { ProductoParams } from "./carrito";
import { getAllInstrumentos } from "../../../servicios/InstrumentoService";
import DetalleCarrito from "../detalleCarrito/detalleCarrito";
import Producto from "../producto/Producto";


const App = () => {
  const [productos, setProductos] = useState<ProductoParams[]>([]);
  const [cartItems, setCartItems] = useState<ProductoParams[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstrumentos();
        setProductos(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleGuardarCarrito = (items: ProductoParams[]) => {
    setCartItems(items);
  };

  const handleSubmitPedido = () => {
    // Implement logic to finalize the order
    console.log("Pedido finalizado:", cartItems);
  };

  return (
    <div>
      {productos.map((producto) => (
        <Producto onGuardarCarrito={function (items: ProductoParams[]): void {
              throw new Error("Function not implemented.");
          } } costoEnvio={""} cantidadVendida={0} categoria={null} key={producto.id} {...producto} />
      ))}
      <Carrito instrumentos={productos} onGuardarCarrito={handleGuardarCarrito} />
      <DetalleCarrito detallePedidos={cartItems} onSubmitPedido={handleSubmitPedido} />
    </div>
  );
};

export default App;
