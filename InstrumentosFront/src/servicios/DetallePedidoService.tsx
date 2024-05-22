import axios from "axios";
import DetallePedido from "../entidades/DetallePedido";

const urlBase = "http://localhost:8081/api/detallePedido";

export async function getAllDetallePedido(): Promise<DetallePedido[]> {
    try {
        const response = await axios.get<DetallePedido[]>(urlBase);
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error fetching all instrumentos:", error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
    }
}

export async function getDetallePedidoById(id: number): Promise<DetallePedido> {
    try {
        const response = await axios.get<DetallePedido>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching instrumento with id ${id}:`, error);
        throw error;
    }
}

export async function saveDetallePedido(detallePedido: DetallePedido): Promise<DetallePedido> {
    try {
        const response = await axios.post<DetallePedido>(urlBase, detallePedido);
        return response.data;
    } catch (error) {
        console.error("Error saving pedido:", error);
        throw error;
    }
}

export async function updateDetallePedido(detallePedido: DetallePedido, id: number): Promise<DetallePedido> {
    try {
        const response = await axios.put<DetallePedido>(`${urlBase}/${id}`, detallePedido);
        return response.data;
    } catch (error) {
        console.error(`Error updating detallePedido with id ${id}:`, error);
        throw error;
    }
}

export async function deletePedido(id: number): Promise<void> {
    try {
        const response = await axios.delete<void>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting detallePedido with id ${id}:`, error);
        throw error;
    }
}
