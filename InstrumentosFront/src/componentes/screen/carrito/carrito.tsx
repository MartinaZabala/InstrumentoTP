import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

export type ProductoParams = {
  id: number;
  imagen: string;
  instrumento: string;
  precio: number;
  cantidad: number;
};

type CarritoProps = {
  instrumentos: ProductoParams[];
  onGuardarCarrito: (items: ProductoParams[]) => void;
};

const Carrito = ({ instrumentos, onGuardarCarrito }: CarritoProps) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState<ProductoParams[]>(instrumentos);

  const handleQuantityChange = (index: number, change: number) => {
    setCartItems(prevCartItems => {
      const newCartItems = [...prevCartItems]; // Crear una copia del estado anterior
      newCartItems[index] = { ...newCartItems[index], cantidad: Math.max(1, newCartItems[index].cantidad + change) }; // Actualizar la cantidad
      return newCartItems; // Actualizar el estado
    });
  };

  const handleGuardarCarrito = () => {
    onGuardarCarrito(cartItems);
    setShowCartModal(false);
    console.log("cartItems:", cartItems)
  };

  return (
    <>
      <Button onClick={() => setShowCartModal(true)}>
        <FaShoppingCart />
      </Button>

      <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <img src={`/img/${item.imagen}`} alt={item.instrumento} className="imagen-carrito" />
                  <span>{item.instrumento}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Button onClick={() => handleQuantityChange(index, -1)}>-</Button>
                  <span className="mx-2">{item.cantidad}</span>
                  <Button onClick={() => handleQuantityChange(index, 1)}>+</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarCarrito}>
            Guardar Carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Carrito;
