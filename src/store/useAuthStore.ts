// src/store/useAuthStore.ts
import { create } from "zustand";

export type UserRole = "dueno" | "veterinaria";

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  telefono: string;
  rol: UserRole;
  matricula?: string;
  horarios?: string;
}

interface AuthState {
  usuarioActual: UserProfile | null;
  iniciarSesion: (email: string, contrasena: string) => boolean;
  cerrarSesion: () => void;
  cambiarRol: (nuevoRol: UserRole) => void; // 👈 1. Agregar esta línea a la interfaz
  recuperarContrasena: (email: string) => boolean;
}

const USUARIOS_DEMO: UserProfile[] = [
  {
    id: "user-1",
    email: "dueno@mismascotas.com",
    nombre: "Malena Clemente",
    telefono: "+54 9 351 123-4567",
    rol: "dueno",
  },
  {
    id: "vet-1",
    email: "vet@mismascotas.com",
    nombre: "Dra. Silva - Veterinaria Central",
    telefono: "+54 9 351 987-6543",
    rol: "veterinaria",
    matricula: "MP-8492",
    horarios: "Lunes a Viernes de 09:00 a 19:00 hs",
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  usuarioActual: USUARIOS_DEMO[0], // Inicia con sesión de dueño por defecto para probar directo

  iniciarSesion: (email, _contrasena) => {
    const usuario = USUARIOS_DEMO.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (usuario) {
      set({ usuarioActual: usuario });
      return true;
    }
    return false;
  },

  cerrarSesion: () => set({ usuarioActual: null }),

  // 👈 2. Agregar la implementación de cambiarRol
  cambiarRol: (nuevoRol) =>
    set((state) => ({
      usuarioActual: state.usuarioActual
        ? { ...state.usuarioActual, rol: nuevoRol }
        : null,
    })),

  recuperarContrasena: (email) => {
    return USUARIOS_DEMO.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
  },
}));
