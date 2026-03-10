import api from './api';
import { categoriasMock } from './Mock';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export interface Categoria {
  id: number;
  nome: string;
}

export const CategoriaService = {
  getAll: () => {
    if (useMock) {
      return Promise.resolve({
        data: categoriasMock
      });
    } else {
      return api.get<Categoria[]>('/api/categorias');
    }
  },

  create: (data: Omit<Categoria, 'id'>) => { return api.post<Categoria>('/api/categorias', data); },
  update: (id: number, data: Omit<Categoria, 'id'>) => { return api.put<Categoria>(`/api/categorias/${id}`, data); },
  delete: (id: number) => { return api.delete(`/api/categorias/${id}`); }
};
