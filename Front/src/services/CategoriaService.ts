import api from './api';

export interface Categoria {
  id?: number;
  nome: string;
}

export const CategoriaService = {
  getAll: () =>  api.get<Categoria[]>('/api/categorias'),
  create: (data: Omit<Categoria, 'id'>) => { return api.post<Categoria>('/api/categorias', data); },
  update: (data: Categoria) => { return api.put<Categoria>(`/api/categorias/${data.id}`, data); },
  delete: (id: number) => { return api.delete(`/api/categorias/${id}`); }
};
