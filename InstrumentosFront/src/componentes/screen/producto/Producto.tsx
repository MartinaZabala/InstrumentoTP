import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteInstrumento } from "../../../servicios/InstrumentoService";
import { CategoriaInstrumento } from "../../../entidades/CategoriaInstrumento";
import FormularioEditarInst from "../../../ui/NavBar/Modal/FormEditar/FormularioEditarInst";
import Carrito, { ProductoParams as CarritoProductoParams } from "../carrito/carrito";
import "./Producto.css"

export type ProductoParams = {
  id: number;
  imagen: string;
  instrumento: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  categoria: CategoriaInstrumento | null;
  cantidad: number; // Agregar la propiedad cantidad
  onGuardarCarrito: (items: CarritoProductoParams[]) => void;
};

const determinarEnvio = (costoEnvio: string) => {
  if (costoEnvio === "G") {
    return "Envío gratis a todo el país";
  } else {
    return "Costo de envío interior de Argentina $" + costoEnvio;
  }
};

const Producto = (args: ProductoParams) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteInstrumento(args.id);
      setShowModal(false);
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };

  const handleCloseEditForm = () => setShowEditForm(false);

  const handleGuardarCarrito = () => {
    args.onGuardarCarrito([{ ...args, cantidad: 1 }]);
  };

  return (
    <div className="producto">
      <img className="imagen" src={"/img/" + args.imagen} alt="imagen del producto" />
      <div className="datos">
        <div className="titulo">{args.instrumento}</div>
        <div className="precio">$ {args.precio}</div>
        <div className="envio">
          <p className={`mt-4 card-text ${args.costoEnvio === "G" ? "envio-gratis" : "envio-costo"}`}>
            {determinarEnvio(args.costoEnvio)}
          </p>
        </div>
        <div>{args.cantidadVendida} vendidos</div>
        <div className="categoria-container">
          <div>
            <p className="titulo-categoria">Categoría:</p>
            <div className="categoria">{args.categoria ? args.categoria.denominacion : "Cargando..."}</div>
          </div>
        </div>
      </div>
      <Button className="BotonEliminar" onClick={() => setShowModal(true)}>
        Eliminar
      </Button>
      <Button className="BotonEditar" onClick={() => setShowEditForm(true)}>
        Editar
      </Button>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar el instrumento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Instrumento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioEditarInst closeModal={handleCloseEditForm} instrumento={args} categorias={[]} />
        </Modal.Body>
      </Modal>
      <Carrito instrumentos={[args]} onGuardarCarrito={handleGuardarCarrito} />
    </div>
  );
};

export default Producto;
