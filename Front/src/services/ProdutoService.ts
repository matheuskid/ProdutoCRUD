import api from './api';

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
  getAll: () => api.get<Produto[]>('/api/produtos'),
  create: (data: Omit<Produto, 'id'>) => api.post('/api/produtos', data),
  update: (data: Produto) => api.put(`/api/produtos/${data.id}`, data),
  delete: (id: number) => api.delete(`/api/produtos/${id}`)
};