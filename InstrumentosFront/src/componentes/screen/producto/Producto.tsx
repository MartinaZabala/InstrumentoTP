import { useState } from "react";
import { Link } from "react-router-dom";
import "./Producto.css"; // Importa el archivo de estilos CSS
import { Button, Modal } from "react-bootstrap";
import { deleteInstrumento } from "../../../servicios/InstrumentoService";
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
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteInstrumento(args.id);
      window.location.reload();
      setShowModal(false);
      // Aquí puedes agregar lógica adicional después de eliminar el instrumento, como recargar la lista de productos
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
      // Aquí puedes manejar errores relacionados con la eliminación del instrumento
    }
  };

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
          <p
            className={`mt-4 card-text ${
              args.costoEnvio === "G" ? "envio-gratis" : "envio-costo"
            }`}
          >
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

      <Button className="BotonEliminar" onClick={() => setShowModal(true)}>
        Eliminar
      </Button>
      <Button className="BotonEditar">Editar</Button>

      {/* Modal de confirmación para eliminar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el instrumento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
