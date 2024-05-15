import axios from "axios";
import Instrumento from "../entidades/Instrumento";

const urlBase = "http://localhost:8081/api/instrumento";

export async function getAllInstrumentos(): Promise<Instrumento[]> {
    try {
        const response = await axios.get<Instrumento[]>(urlBase);
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error fetching all instrumentos:", error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
    }
}

export async function getInstrumentoById(id: number): Promise<Instrumento> {
    try {
        const response = await axios.get<Instrumento>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching instrumento with id ${id}:`, error);
        throw error;
    }
}

export async function saveInstrumento(instrumento: Instrumento): Promise<Instrumento> {
    try {
        const response = await axios.post<Instrumento>(urlBase, instrumento);
        return response.data;
    } catch (error) {
        console.error("Error saving instrumento:", error);
        throw error;
    }
}

export async function updateInstrumento(instrumento: Instrumento, id: number): Promise<Instrumento> {
    try {
        const response = await axios.put<Instrumento>(`${urlBase}/${id}`, instrumento);
        return response.data;
    } catch (error) {
        console.error(`Error updating instrumento with id ${id}:`, error);
        throw error;
    }
}

export async function deleteInstrumento(id: number): Promise<void> {
    try {
        const response = await axios.delete<void>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting instrumento with id ${id}:`, error);
        throw error;
    }
}
