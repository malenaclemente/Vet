//Base de datos de Mascotas

import { create } from "zustand";

export interface RegistroVacuna {
  id: string;
  nombre: string;
  fecha: string;
}

export interface EntradaHistorial {
  id: string;
  fecha: string;
  motivo: string;
  diagnostico: string;
  veterinario: string;
}

export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  peso: string;
  microchip?: string;
  alergias?: string;
  alimentosToxicos?: string;
  dieta?: string;
  vacunas: RegistroVacuna[];
  historialClinico: EntradaHistorial[];
}

interface PetState {
  mascotas: Mascota[];
  agregarMascota: (
    mascota: Omit<Mascota, "id" | "vacunas" | "historialClinico">,
  ) => void;
  modificarMascota: (id: string, datos: Partial<Mascota>) => void;
  eliminarMascota: (id: string) => void;
  agregarHistorial: (
    mascotaId: string,
    entrada: Omit<EntradaHistorial, "id">,
  ) => void;
  eliminarHistorial: (mascotaId: string, entradaId: string) => void;
  agregarVacuna: (
    mascotaId: string,
    vacuna: Omit<RegistroVacuna, "id">,
  ) => void;
}

export const usePetStore = create<PetState>((set) => ({
  mascotas: [
    {
      id: "1",
      nombre: "Ciro",
      especie: "Canino",
      raza: "Mestizo",
      edad: "4",
      peso: "12",
      microchip: "982000123456789",
      alergias: "Polen",
      alimentosToxicos: "Chocolate, cebolla",
      dieta: "Balanceado hipoalergénico",
      vacunas: [{ id: "v1", nombre: "Antirrábica", fecha: "2025-10-12" }],
      historialClinico: [
        {
          id: "h1",
          fecha: "2025-10-12",
          motivo: "Control anual",
          diagnostico: "Óptimo estado",
          veterinario: "Clínica Central",
        },
      ],
    },
  ],

  agregarMascota: (nueva) =>
    set((state) => ({
      mascotas: [
        ...state.mascotas,
        {
          ...nueva,
          id: Date.now().toString(),
          vacunas: [],
          historialClinico: [],
        },
      ],
    })),

  modificarMascota: (id, datos) =>
    set((state) => ({
      mascotas: state.mascotas.map((m) =>
        m.id === id ? { ...m, ...datos } : m,
      ),
    })),

  eliminarMascota: (id) =>
    set((state) => ({
      mascotas: state.mascotas.filter((m) => m.id !== id),
    })),

  agregarHistorial: (mascotaId, entrada) =>
    set((state) => ({
      mascotas: state.mascotas.map((m) => {
        if (m.id !== mascotaId) return m;
        return {
          ...m,
          historialClinico: [
            ...m.historialClinico,
            { ...entrada, id: Date.now().toString() },
          ],
        };
      }),
    })),

  eliminarHistorial: (mascotaId, entradaId) =>
    set((state) => ({
      mascotas: state.mascotas.map((m) => {
        if (m.id !== mascotaId) return m;
        return {
          ...m,
          historialClinico: m.historialClinico.filter(
            (h) => h.id !== entradaId,
          ),
        };
      }),
    })),

  agregarVacuna: (mascotaId, vacuna) =>
    set((state) => ({
      mascotas: state.mascotas.map((m) => {
        if (m.id !== mascotaId) return m;
        return {
          ...m,
          vacunas: [...m.vacunas, { ...vacuna, id: Date.now().toString() }],
        };
      }),
    })),
}));
