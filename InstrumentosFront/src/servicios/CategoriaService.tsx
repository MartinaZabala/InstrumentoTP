import axios from "axios";

const urlBase = "http://localhost:8081/api/instrumentoCategoria";

export async function getAllCategoria(): Promise<CategoriaInstrumento[]> {
  try {
    const response = await axios.get<CategoriaInstrumento[]>(urlBase);
    return response.data;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
}

export async function getCategoriaById(id: number): Promise<CategoriaInstrumento> {
  try {
    const response = await axios.get<CategoriaInstrumento>(`${urlBase}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
}

export async function saveCategoria(categoriaInstrumento: CategoriaInstrumento): Promise<CategoriaInstrumento> {
  try {
    const response = await axios.post<CategoriaInstrumento>(urlBase, categoriaInstrumento);
    return response.data;
  } catch (error) {
    console.error("Error saving category:", error);
    throw error;
  }
}

export async function updateCategoria(categoriaInstrumento: CategoriaInstrumento, id: number): Promise<CategoriaInstrumento> {
  try {
    const response = await axios.put<CategoriaInstrumento>(`${urlBase}/${id}`, categoriaInstrumento);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
}

export async function deleteCategoria(id: number): Promise<void> {
  try {
    await axios.delete<void>(`${urlBase}/${id}`);
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
}
