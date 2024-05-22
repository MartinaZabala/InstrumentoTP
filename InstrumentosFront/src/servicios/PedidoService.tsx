import axios from "axios";
import Pedido from "../entidades/Pedido";

const urlBase = "http://localhost:8081/api/pedido";

export async function getAllPedido(): Promise<Pedido[]> {
    try {
        const response = await axios.get<Pedido[]>(urlBase);
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error fetching all instrumentos:", error);
        throw error;  // Lanza el error para que pueda ser manejado en el componente
    }
}

export async function getPedidoById(id: number): Promise<Pedido> {
    try {
        const response = await axios.get<Pedido>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching instrumento with id ${id}:`, error);
        throw error;
    }
}

export async function savePedido(pedido: Pedido): Promise<Pedido> {
    try {
        const response = await axios.post<Pedido>(urlBase, pedido);
        return response.data;
    } catch (error) {
        console.error("Error saving pedido:", error);
        throw error;
    }
}

export async function updatePedido(pedido: Pedido, id: number): Promise<Pedido> {
    try {
        const response = await axios.put<Pedido>(`${urlBase}/${id}`, pedido);
        return response.data;
    } catch (error) {
        console.error(`Error updating pedido with id ${id}:`, error);
        throw error;
    }
}

export async function deletePedido(id: number): Promise<void> {
    try {
        const response = await axios.delete<void>(`${urlBase}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting pedido with id ${id}:`, error);
        throw error;
    }
}
