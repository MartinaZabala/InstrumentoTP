import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"

const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            src="https://img.freepik.com/foto-gratis/vista-guitarra-tienda-instrumentos-musicales_23-2150779982.jpg?t=st=1714159917~exp=1714163517~hmac=d89168676ca66e5e0ff37102210892b917a19ee099f1bb3d6e6a81fa13211e58&w=740"
            className="d-block w-100"
          />
          <Carousel.Caption>
          <h3>Tienda</h3>
        </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img
            src="https://img.freepik.com/foto-gratis/acercamiento-persona-sosteniendo-tocando-acordeon_181624-17769.jpg?t=st=1714160401~exp=1714164001~hmac=b20a17d0b43119733f63977765ae449a9a70dcfb6c23aa2f4dafec21518c15a9&w=740"
            className="d-block w-100"
          />
          <Carousel.Caption>
          <h3>La mejor calidad</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://img.freepik.com/foto-gratis/vista-superior-flauta-metal_23-2148201692.jpg?t=st=1714160465~exp=1714164065~hmac=0ff2042c37f96911bb99c36a67b50644d18cceb1c02c0b4da9013547cf047e72&w=740"
            className="d-block w-100"
          />
          <Carousel.Caption>
          <h3>Hace magia con nuestros instrumentos</h3>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://img.freepik.com/foto-gratis/tecla-piano_74190-127.jpg?t=st=1714161168~exp=1714164768~hmac=efffd615367ebf0fd0921f4430df4f1358a7021b6952db19cbe7462cbf3a109a&w=740"
            className="d-block w-100"
          />
          <Carousel.Caption>
          <h3>Los productos que buscas</h3>
        </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="text-container">
        <p>
          <strong>Musical Hendrix</strong> es una tienda de instrumentos
          musicales con ya más de 15 años de experiencia. Tenemos el{" "}
          <strong>conocimiento</strong> y la <strong>capacidad</strong> como
          para informarte acerca de las mejores elecciones para tu compra
          musical.
        </p>
      </div>
    </div>
  );
};

export default Home;
