import { ChangeEventHandler } from "react";
import { CategoriaInstrumento } from "./CategoriaInstrumento";


export interface Instrumento {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  cantidad: number;
  addCarrito?:ChangeEventHandler;
  categoriaInstrumento: CategoriaInstrumento;
}
