import React, { useEffect, useState } from "react";
import "./catalogo.css";
import { getAllInstrumentos } from "../../../servicios/InstrumentoService";
import { Instrumento } from "../../../entidades/Instrumento";
import Producto from "../producto/Producto";
import { ProductoParams } from "../carrito/carrito";

export const Catalogo = () => {
  const [productos, setProductos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstrumentos();  // getAllInstrumentos devuelve solo los datos
        setProductos(data);  // Establece el estado con los datos recibidos
      } catch (error) {
        console.error("Error al obtener los instrumentos:", error);
      }
    };

    fetchData();
  }, []);
  const handleGuardarCarrito = (items: ProductoParams[]) => {
    // Implementa la lógica para guardar los elementos en el carrito aquí
    console.log("Elementos guardados en el carrito:", items);
  };


  return (
    <div className="catalogo">
      {productos.map((producto: Instrumento) => (
        <Producto
          key={producto.id}
          imagen={producto.imagen}
          instrumento={producto.instrumento}
          precio={producto.precio}
          costoEnvio={producto.costoEnvio}
          cantidadVendida={producto.cantidadVendida}
          id={producto.id}
          categoria={producto.categoriaInstrumento} // Pasar la categoría como parte de los parámetros
          cantidad={0} onGuardarCarrito={function (items: ProductoParams[]): void {
          } }        />
      ))}
    </div>
  );
};
