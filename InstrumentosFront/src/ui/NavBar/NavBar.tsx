import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CategoriaInstrumento from "../../entidades/CategoriaInstrumento";
import { getAllCategorias, postInstrumentos } from "../../servicios/FuncionesApi";
import "../NavBar/NavBar.css"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const [isOpcionesOpen, setIsOpcionesOpen] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaInstrumento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    categoriaInstrumento: null as CategoriaInstrumento | null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategorias();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      [name]: value
    }));
  };

  const handleCategoriaChange = (categoria: CategoriaInstrumento) => {
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      categoriaInstrumento: categoria
    }));
  };

  const handleEnvioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoInstrumento((prevInstrumento) => ({
      ...prevInstrumento,
      [name]: parseFloat(value)
    }));
  };

  const guardarInstrumento = async () => {
    try {
      if (nuevoInstrumento.categoriaInstrumento) {
        // Solo intenta guardar si categoriaInstrumento no es null
        await postInstrumentos({
          ...nuevoInstrumento,
          categoriaInstrumento: nuevoInstrumento.categoriaInstrumento as CategoriaInstrumento // Asegura el tipo
        });
        closeModal();
      } else {
        console.error("No se puede guardar el instrumento sin una categoría válida.");
      }
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
                <Link to={`/categoria/instrumentos/${categoria.id}`} className="dropdown-item">
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
          <form>
            <div className="form-group">
              <label htmlFor="instrumento">Nombre:</label>
              <input type="text" id="instrumento" name="instrumento" placeholder="Nombre" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="marca">Marca:</label>
              <input type="text" id="marca" name="marca" placeholder="Marca" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="modelo">Modelo:</label>
              <input type="text" id="modelo" name="modelo" placeholder="Modelo" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="imagen">Imagen URL:</label>
              <input type="text" id="imagen" name="imagen" placeholder="Imagen URL" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio:</label>
              <input type="number" id="precio" name="precio" placeholder="Precio" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="costoEnvio">Costo de Envío:</label>
              <select id="costoEnvio" name="costoEnvio" onChange={handleInputChange}>
                <option value="G">Gratuito</option>
                <option value="C">Con Cargo</option>
              </select>
            </div>
            {nuevoInstrumento.costoEnvio === 'C' && (
              <div className="form-group">
                <label htmlFor="montoEnvio">Monto del Envío:</label>
                <input type="number" id="montoEnvio" name="montoEnvio" placeholder="Monto del Envío" onChange={handleEnvioChange} />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea id="descripcion" name="descripcion" placeholder="Descripción" onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="categoriaInstrumento">Categoría:</label>
              <select id="categoriaInstrumento" name="categoriaInstrumento" onChange={(e) => handleCategoriaChange(categorias[parseInt(e.target.value)])}>
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria, index) => (
                  <option key={categoria.id} value={index}>{categoria.denominacion}</option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
          <Button variant="primary" onClick={guardarInstrumento}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default NavBar;
