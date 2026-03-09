import api from './api';
import { produtosMock } from './Mock';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export interface Produto {
  id?: number; // Opcional porque ao criar, o ID é null
  nome: string;
  preco: number;
  categoria: {
    id: number;
    nome: string;
  };
}

export const ProdutoService = {
  getAll: () => {
    if (useMock) {
      return Promise.resolve({
        data: produtosMock
      });
    } 
    return api.get<Produto[]>('/api/produtos');
  },
  create: (data: Omit<Produto, 'id'>) => api.post('/api/produtos', data),
  delete: (id: number) => api.delete(`/api/produtos/${id}`)
};