import Instrumento from "./Instrumento";

export default class CategoriaInstrumento {
    id: number;
    denominacion: string;
    instrumentos: Instrumento[]; // Define la propiedad instrumentos

    constructor(id: number = 0, denominacion: string = "", instrumentos: Instrumento[] = []) {
        this.id = id;
        this.denominacion = denominacion;
        this.instrumentos = instrumentos; // Asigna la propiedad instrumentos
    }
}
