// CarritoContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ItemCarrito = {
  instrumento: any;
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
};

type CarritoContextType = {
  carrito: ItemCarrito[];
  agregarAlCarrito: (item: ItemCarrito) => void;
  eliminarDelCarrito: (id: number) => void;
};

const CarritoContext = createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
});

type CarritoProviderProps = {
  children: ReactNode; // Define el tipo de children como ReactNode
};

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  const agregarAlCarrito = (item: ItemCarrito) => {
    setCarrito([...carrito, item]);
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
