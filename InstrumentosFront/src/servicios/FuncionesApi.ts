import Instrumento from "../entidades/Instrumento";
import CategoriaInstrumento from "../entidades/CategoriaInstrumento";

export async function getAllInstrumentos(): Promise<Instrumento[]> {
    try {
        const urlServer = 'http://localhost:8081/api/instrumento';
        const response = await fetch(urlServer);
        return await response.json();
    } catch (error) {
        console.error("Error al obtener todos los instrumentos:", error);
        throw error;
    }
}

export async function postInstrumentos(instrumento: Instrumento): Promise<Instrumento> {
    try {
        const urlServer = 'http://localhost:8081/api/instrumento';
        const response = await fetch(urlServer, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(instrumento)
        });
        return await response.json();
    } catch (error) {
        console.error("Error al crear el instrumento:", error);
        throw error;
    }
}


export async function putInstrumentosById(id: number): Promise<Instrumento[]> {
    try {
        const urlServer = `http://localhost:8081/api/instrumento/${id}`;
        const response = await fetch(urlServer);
        return await response.json();
    } catch (error) {
        console.error("Error al editar el instrumentos:", error);
        throw error;
    }
}

export async function DeleteInstrumentosById(id: number): Promise<Instrumento[]> {
    try {
        const urlServer = `http://localhost:8081/api/instrumento/${id}`;
        const response = await fetch(urlServer);
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar el instrumentos:", error);
        throw error;
    }
}

export async function getInstrumentoById(id: number): Promise<Instrumento> {
    try {
        const urlServer = `http://localhost:8081/api/instrumento/${id}`;
        const response = await fetch(urlServer);
        const instrumento = await response.json() as Instrumento;

        // Obtener la categoría del instrumento por su ID
        const categoriaResponse = await fetch(`http://localhost:8081/api/instrumentoCategoria/${instrumento.categoriaInstrumento.id}`);
        const categoriaData = await categoriaResponse.json();
        const categoria = new CategoriaInstrumento();
        categoria.denominacion = categoriaData.denominacion;

        // Asignar la categoría al instrumento
        instrumento.categoriaInstrumento = categoria;

        return instrumento;
    } catch (error) {
        console.error("Error al obtener el instrumento por ID:", error);
        throw error;
    }
}

export async function getAllCategorias(): Promise<CategoriaInstrumento[]> {
    try {
        const urlServer = 'http://localhost:8081/api/instrumentoCategoria';
        const response = await fetch(urlServer);
        return await response.json();
    } catch (error) {
        console.error("Error al obtener todas las categorías:", error);
        throw error;
    }
}






