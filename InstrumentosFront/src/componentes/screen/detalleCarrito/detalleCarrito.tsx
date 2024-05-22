import { Button, Table } from 'react-bootstrap';
import { ProductoParams } from '../carrito/carrito';

type DetalleCarritoProps = {
  detallePedidos: ProductoParams[];
  onSubmitPedido: () => void;
};

const DetalleCarrito = ({ detallePedidos, onSubmitPedido }: DetalleCarritoProps) => {
  const calcularTotal = () => {
    return detallePedidos.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <div className="detalle-carrito">
      <h2>Detalle del Carrito</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Instrumento</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {detallePedidos.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={`/img/${item.imagen}`} alt={item.instrumento} className="imagen-detalle" />
              </td>
              <td>{item.instrumento}</td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h3>Total: ${calcularTotal()}</h3>
      <Button variant="primary" onClick={onSubmitPedido}>
        Finalizar Compra
      </Button>
    </div>
  );
};

export default DetalleCarrito;
