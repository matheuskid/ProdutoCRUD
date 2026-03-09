import { defineStore } from 'pinia';
import { ProdutoService, type Produto } from '@/services/ProdutoService';

export const ProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [] as Produto[],
    loading: false
  }),
  actions: {
    async fetchProdutos() {
      this.loading = true;
      try {
        const { data } = await ProdutoService.getAll();
        this.produtos = data;
      } finally {
        this.loading = false;
      }
    },
    async deleteProduto(id: number) {
      await ProdutoService.delete(id);
      await this.fetchProdutos(); // Recarrega a lista após deletar
    }
  }
});