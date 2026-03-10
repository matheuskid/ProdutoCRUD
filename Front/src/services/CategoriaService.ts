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

  create: (data: Omit<Categoria, 'id'>) => { return api.post<Categoria>('/api/categorias', data); }
};
