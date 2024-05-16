import React, { useEffect, useState } from "react";
import { getAllCategoria } from "../../../servicios/CategoriaService";
import { saveInstrumento } from "../../../servicios/InstrumentoService";
import { Button } from "react-bootstrap";

interface FormularioInstrumentoProps {
  closeModal: () => void;
  categorias: CategoriaInstrumento[];
  guardarInstrumento: () => Promise<void>;
}

const FormularioInstrumento: React.FC<FormularioInstrumentoProps> = ({
  closeModal,
}) => {
  const [categorias, setCategorias] = useState<CategoriaInstrumento[]>([]);
  const [nuevoInstrumento, setNuevoInstrumento] = useState({
    id: 0,
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: "G",
    cantidadVendida: 0,
    descripcion: "",
    categoriaInstrumento: {
      id: 0,
      denominacion: "",
    },
    montoEnvio: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategoria();
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      [name]: value,
    }));
  };

  const handleCategoriaChange = (categoria: CategoriaInstrumento) => {
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      categoriaInstrumento: categoria,
    }));
  };

  const handleCostoEnvioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      costoEnvio: value,
      montoEnvio: value === "G" ? 0 : 0,
    }));
  };

  const handleMontoEnvioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      montoEnvio: parseInt(value) || 0, // Asegurar que montoEnvio sea un número o 0 si es inválido
    }));
  };

  const guardarInstrumento = async () => {
    try {
      if (nuevoInstrumento.categoriaInstrumento) {
        await saveInstrumento(nuevoInstrumento);
        closeModal();
        window.location.reload();
      } else {
        console.error(
          "No se puede guardar el instrumento sin una categoría válida."
        );
      }
    } catch (error) {
      console.error("Error al guardar el instrumento:", error);
    }
  };

  return (
    <form className="formulario-container">
      <div className="form-group">
        <label htmlFor="instrumento">Nombre:</label>
        <input
          type="text"
          id="instrumento"
          name="instrumento"
          placeholder="Nombre"
          value={nuevoInstrumento.instrumento || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="marca">Marca:</label>
        <input
          type="text"
          id="marca"
          name="marca"
          placeholder="Marca"
          value={nuevoInstrumento.marca || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="modelo">Modelo:</label>
        <input
          type="text"
          id="modelo"
          name="modelo"
          placeholder="Modelo"
          value={nuevoInstrumento.modelo || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Imagen URL:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          placeholder="Imagen URL"
          value={nuevoInstrumento.imagen || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          placeholder="Precio"
          value={nuevoInstrumento.precio || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="costoEnvio">Costo de Envío:</label>
        <select
          id="costoEnvio"
          name="costoEnvio"
          onChange={handleCostoEnvioChange}
          value={nuevoInstrumento.costoEnvio || "G"}
        >
          <option value="G">Gratuito</option>
          <option value="C">Con Cargo</option>
        </select>
      </div>
      {nuevoInstrumento.costoEnvio === "C" && (
        <div className="form-group">
          <label htmlFor="montoEnvio">Monto del Envío:</label>
          <input
            type="number"
            id="montoEnvio"
            name="montoEnvio"
            placeholder="Monto del Envío"
            value={nuevoInstrumento.montoEnvio || ""}
            onChange={handleMontoEnvioChange}
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          placeholder="Descripción"
          value={nuevoInstrumento.descripcion || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoriaInstrumento">Categoría:</label>
        <select
          id="categoriaInstrumento"
          name="categoriaInstrumento"
          onChange={(e) =>
            handleCategoriaChange(categorias[parseInt(e.target.value)])
          }
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria, index) => (
            <option key={categoria.id} value={index}>
              {categoria.denominacion}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarInstrumento}
          className="BotonGModal"
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default FormularioInstrumento;
