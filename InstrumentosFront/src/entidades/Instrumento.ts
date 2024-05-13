import CategoriaInstrumento from "./CategoriaInstrumento";

export default class Instrumento {
    id: number = 0;
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: number = 0;
    costoEnvio: string = "G"; // Definir el mismo valor predeterminado que en el backend
    cantidadVendida: number = 0;
    descripcion: string = "";
    categoriaInstrumento: CategoriaInstrumento;

    constructor(){
        this.categoriaInstrumento= new CategoriaInstrumento();
    }
}
