import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "../NavBar/NavBar.css";
import { getAllCategoria } from "../../servicios/CategoriaService";
import { saveInstrumento } from "../../servicios/InstrumentoService";
import { Instrumento } from "../../entidades/Instrumento";
import FormularioInstrumento from "./Modal/Form/FormularioInstrumento";
import { CategoriaInstrumento } from "../../entidades/CategoriaInstrumento";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isOpcionesOpen, setIsOpcionesOpen] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaInstrumento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoInstrumento] = useState<Instrumento | null>(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCategoriaOpen(false);
    setIsOpcionesOpen(false);
  };

  const toggleCategoria = () => {
    setIsCategoriaOpen(!isCategoriaOpen);
    setIsMenuOpen(false);
    setIsOpcionesOpen(false);
  };

  const toggleOpciones = () => {
    setIsOpcionesOpen(!isOpcionesOpen);
    setIsMenuOpen(false);
    setIsCategoriaOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const guardarInstrumento = async () => {
    if (nuevoInstrumento) {
      try {
        if (nuevoInstrumento.categoriaInstrumento) {
          await saveInstrumento(nuevoInstrumento);
          closeModal();
          window.location.reload(); // Recarga la página después de guardar
        } else {
          console.error(
            "No se puede guardar el instrumento sin una categoría válida."
          );
        }
      } catch (error) {
        console.error("Error al guardar el instrumento:", error);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Musical Hendrix</div>
      <div className="navbar-categoria">
        <button className="menu-button" onClick={toggleCategoria}>
          Categorias
        </button>
        {isCategoriaOpen && (
          <ul className="menu-list">
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <Link
                  to={`/categoria/instrumentos/${categoria.id}`}
                  className="dropdown-item"
                >
                  {categoria.denominacion}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="navbar-menu">
        <button className="menu-button" onClick={toggleMenu}>
          Menú
        </button>
        {isMenuOpen && (
          <ul className="menu-list">
            <li>
              <Link className="dropdown-item" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/DondeEstamos">
                Donde Estamos
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/Catalogo/Productos">
                Productos
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-opciones">
        <button className="menu-button" onClick={toggleOpciones}>
          Opciones
        </button>
        {isOpcionesOpen && (
          <ul className="menu-list">
            <li>
              <button className="dropdown-item" onClick={openModal}>
                Crear
              </button>
            </li>
            <li>
              <Link to="/DetalleCarrito" className="dropdown-item">
                Detalle Carrito
              </Link>
            </li>
          </ul>
        )}
      </div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Instrumento</Modal.Title>
        </Modal.Header>
        <FormularioInstrumento
          closeModal={closeModal}
          categorias={categorias}
          guardarInstrumento={guardarInstrumento}
        />
      </Modal>
    </nav>
  );
};

export default NavBar;
