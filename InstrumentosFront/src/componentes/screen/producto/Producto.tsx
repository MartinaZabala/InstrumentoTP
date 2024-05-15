// Componente Producto

import { Link } from "react-router-dom";
import CategoriaInstrumento from "../../../entidades/CategoriaInstrumento";
import "./Producto.css"; // Importa el archivo de estilos CSS
import { Button } from "react-bootstrap";

type ProductoParams = {
  id: number;
  imagen: string;
  instrumento: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  categoria: CategoriaInstrumento | null;
};

const determinarEnvio = (costoEnvio: string) => {
  if (costoEnvio === "G") {
    return "Envío gratis a todo el país";
  } else {
    return "Costo de envío interior de Argentina $" + costoEnvio;
  }
};

export const Producto = (args: ProductoParams) => {
  return (
    <div className="producto">
      <img
        className="imagen"
        src={"/img/" + args.imagen}
        alt="imagen del producto"
      />
      <div className="datos">
        <Link to={`/DetalleProducto/${args.id}`}>
          <div className="titulo">{args.instrumento}</div>
        </Link>
        <div className="precio">$ {args.precio}</div>
        <div className="envio">
  <p className={`mt-4 card-text ${args.costoEnvio === 'G' ? 'envio-gratis' : 'envio-costo'}`}>
    {determinarEnvio(args.costoEnvio)}
  </p>
</div>
        
        <div>{args.cantidadVendida} vendidos</div>
        <div className="categoria-container">
          <div>
            <p className="titulo-categoria">Categoría:</p>
            <div className="categoria">
              {args.categoria ? args.categoria.denominacion : "Cargando..."}
            </div>
          </div>
        </div>
      </div>
      
      <Button className="BotonEliminar">Eliminar</Button>
      <Button className="BotonEditar">Editar</Button>
    </div>
    
  );
};
