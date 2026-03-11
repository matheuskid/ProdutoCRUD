import { defineStore } from 'pinia';
import { CategoriaService, type Categoria } from '@/services/CategoriaService';
import { NotificationStore } from '@/stores/NotificationStore';

const notify = NotificationStore();

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
        notify.show('Categoria adicionada com sucesso!', 'success');
      } catch (error: any) {
        if (error.response?.status === 409) {
          notify.show('Não é possível adicionar: esse nome já é usado.', 'error');
        } else {
          notify.show('Erro inesperado ao adicionar categoria.', 'error');
        }
      } finally {
        this.loading = false;
      }
    },

    async atualizarCategoria(categoria: Categoria) {
      this.loading = true;
      try {
        const { data } = await CategoriaService.update(categoria);
        const index = this.categorias.findIndex((c) => c.id === categoria.id);
        if (index !== -1) {
          this.categorias[index] = data;
        }
        notify.show('Categoria atualizada com sucesso!', 'success');
      } catch (error: any) {
        if (error.response?.status === 409) {
          notify.show('Não é possível adicionar: esse nome já é usado.', 'error');
        } else {
          notify.show('Erro inesperado ao adicionar categoria.', 'error');
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
        notify.show('Categoria removida com sucesso!', 'success');
      } catch (error: any) {
        if (error.response?.status === 409) {
          notify.show('Não é possível remover: produtos vinculados a esta categoria!', 'error');
        } else {
          notify.show('Erro inesperado ao remover categoria.', 'error');
        }
      } finally {
        this.loading = false;
      }
    }
  }
});