import { defineStore } from 'pinia';
import { CategoriaService, type Categoria } from '@/services/CategoriaService';

export const CategoriaStore = defineStore('categoria', {
  state: () => ({
    categorias: [] as Categoria[],
    loading: false
  }),
  actions: {
    async fetchCategorias() {
      this.loading = true;
      try {
        const { data } = await CategoriaService.getAll();
        this.categorias = data;
      } finally {
        this.loading = false;
      }
    },

    async criarCategoria(categoria: Omit<Categoria, 'id'>) {
      this.loading = true;
      try {
        const { data } = await CategoriaService.create(categoria);
        this.categorias.push(data);
        await this.fetchCategorias();
      } finally {
        this.loading = false;
      }
    }
  }
});