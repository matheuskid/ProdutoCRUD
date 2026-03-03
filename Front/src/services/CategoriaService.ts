import api from './api';

export interface Categoria {
  id: number;
  nome: string;
}

export const CategoriaService = {
  getAll: () => api.get<Categoria[]>('/api/categorias')
};