import React, { useEffect, useState } from "react";
import { getAllInstrumentos } from "../../../servicios/FuncionesApi";
import "./catalogo.css";
import Instrumento from "../../../entidades/Instrumento";
import { Producto } from "../producto/Producto";

export const Catalogo = () => {
  const [productos, setProductos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInstrumentos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los instrumentos:", error);
      }
    };

    fetchData();
  }, []);

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
        />
      ))}
    </div>
  );
};
