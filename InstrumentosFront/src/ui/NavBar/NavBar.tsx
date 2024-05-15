import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import CategoriaInstrumento from "../../entidades/CategoriaInstrumento";
import "../NavBar/NavBar.css";
import { getAllCategoria } from "../../servicios/CategoriaService";
import FormularioInstrumento from "./Modal/FormularioInstrumento";
import { Button } from "react-bootstrap";
import { saveInstrumento } from "../../servicios/InstrumentoService";
import Instrumento from "../../entidades/Instrumento";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isOpcionesOpen, setIsOpcionesOpen] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaInstrumento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const guardarInstrumento = async (instrumento: Instrumento) => {
    try {
      await saveInstrumento(instrumento);
      closeModal();
    } catch (error) {
      console.error("Error al guardar el instrumento:", error);
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
          </ul>
        )}
      </div>
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Instrumento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioInstrumento
            closeModal={closeModal}
            categorias={categorias}
            onSave={guardarInstrumento as (instrumento: Instrumento) => void}
          />

          <Button
            variant="secondary"
            onClick={closeModal}
            className="BotonEModal"
          >
            Eliminar
          </Button>
          <Button
            variant="primary"
            onClick={() => guardarInstrumento(nuevoInstrumento)} // Aquí envolvemos la llamada a guardarInstrumento en una función anónima
            className="BotonGModal"
          >
            Guardar
          </Button>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default NavBar;
