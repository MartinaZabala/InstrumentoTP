import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetalleCategoria.css";
import { getAllCategoria } from "../../../servicios/CategoriaService";
import { getAllInstrumentos } from "../../../servicios/InstrumentoService";
import { Instrumento } from "../../../entidades/Instrumento";
import { CategoriaInstrumento } from "../../../entidades/CategoriaInstrumento";

const DetalleCategoria = () => {
  const { id } = useParams<{ id?: string }>();
  const [categoria, setCategoria] = useState<CategoriaInstrumento | null>(null);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const categoriasData = await getAllCategoria();
          const categoriaData = categoriasData.find(c => c.id === parseInt(id, 10)) ?? null;
          setCategoria(categoriaData);

          const instrumentosData = await getAllInstrumentos();
          const instrumentosCategoria = instrumentosData.filter(instrumento => instrumento.categoriaInstrumento.id === parseInt(id, 10));
          setInstrumentos(instrumentosCategoria);
        }
      } catch (error) {
        console.error("Error al obtener la categoría e instrumentos:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="detalle-categoria-container">
      <h2>Categoría: {categoria?.denominacion}</h2>
      <h3>Instrumentos relacionados:</h3>
      <ul className="instrumentos-list">
        {instrumentos.map(instrumento => (
          <li key={instrumento.id}>
            {instrumento.instrumento}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleCategoria;
