import { defineStore } from 'pinia';
import { CategoriaService, type Categoria } from '@/services/CategoriaService';

export const CategoriaStore = defineStore('categoria', {
  state: () => ({
    categorias: [] as Categoria[],
    loading: false
  }),
  actions: {
    async listarCategorias() {
      this.loading = true;
      try {
        const { data } = await CategoriaService.getAll();
        this.categorias = data;
      } finally {
        this.loading = false;
      }
    },

    async adicionarCategoria(categoria: Omit<Categoria, 'id'>) {
      this.loading = true;
      try {
        const { data } = await CategoriaService.create(categoria);
        this.categorias.push(data);
        await this.listarCategorias();
      } finally {
        this.loading = false;
      }
    },

    async atualizarCategoria(categoria: Categoria) {
      this.loading = true;
      try {
        const { data } = await CategoriaService.update(categoria.id, categoria);
        const index = this.categorias.findIndex((c) => c.id === categoria.id);
        if (index !== -1) {
          this.categorias[index] = data;
        }
      } finally {
        this.loading = false;
      }
    },

    async deletarCategoria(id: number) {
      this.loading = true;
      try {
        await CategoriaService.delete(id);
        this.categorias = this.categorias.filter((c) => c.id !== id);
      } finally {
        this.loading = false;
      }
    }
  }
});