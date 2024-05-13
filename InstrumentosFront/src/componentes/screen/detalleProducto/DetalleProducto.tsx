import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import './DetalleProducto.css';
import Instrumento from "../../../entidades/Instrumento";
import { getInstrumentoById } from "../../../servicios/FuncionesApi";

const DetalleInstrumentos = () => {
  const { id } = useParams<{ id?: string }>();
  const [detalleInstrumento, setDetalleInstrumento] = useState<Instrumento>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const idNumber = parseInt(id);
        const detalleInstrumentoData = await getInstrumentoById(idNumber);
        // Si detalleInstrumentoData es un array, tomar el primer elemento
        const detalleInstrumento = Array.isArray(detalleInstrumentoData) ? detalleInstrumentoData[0] : detalleInstrumentoData;
        setDetalleInstrumento(detalleInstrumento);
        setLoading(false);
        console.log(detalleInstrumento); // Mover aquí para imprimir después de la actualización
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (!detalleInstrumento) {
    return <div>No se encontraron detalles para este instrumento.</div>;
  }

  return (
    <div className="container">
      <div className="card custom-card" style={{ maxWidth: '100%' }}>
        <div className="row g-5">
          <div className="col-md-6">
            <img src={'/img/'+ detalleInstrumento.imagen} className="custom-image" alt={detalleInstrumento.instrumento || 'Detalle del instrumento'} />
            <div className="col-md-12">
              <p className="card-text m-3 custom-description word-wrap-break mt-5"><b>Descripcion: {detalleInstrumento.descripcion}</b></p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text card-vendidos">{detalleInstrumento.cantidadVendida} vendidos</p>
              <h2 className="card-title">{detalleInstrumento.instrumento}</h2>
              <h5 className="card-subtitle mb-2 text-muted mt-4">Marca: {detalleInstrumento.marca}</h5>
              <h5 className="card-subtitle mb-2 text-muted">Modelo: {detalleInstrumento.modelo}</h5>
              <p className={`mt-4 card-text ${detalleInstrumento.costoEnvio === 'G' ? 'text-success' : 'text-warning'}`}>
                {detalleInstrumento.costoEnvio === 'G' && <img src={'/img/camion.png'} alt="Envío Gratis" />} {detalleInstrumento.costoEnvio === 'G' ? 'Envío gratis a todo el país' : `Costo de Envío Interior de Argentina: $${detalleInstrumento.costoEnvio}`}

              </p>
              <div className="row">
                <div className="col-md-12">
                  <button className="btn btn-primary mt-3">Añadir al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default DetalleInstrumentos;