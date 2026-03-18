import { defineStore } from 'pinia';
import { ProdutoService, type Produto } from '@/services/ProdutoService';
import { NotificationStore } from '@/stores/NotificationStore';

const notify = NotificationStore();

export const ProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [] as Produto[],
    loading: false,
    page: 0,
    size: 10,
    totalItems: 0
  }),
  actions: {
    async listarProdutos() {
      this.loading = true;
      try {
        const response = await ProdutoService.getAll(this.page, this.size);
        this.produtos = response.data.content;
        this.totalItems = response.data.totalElements;
      } finally {
        this.loading = false;
      }
    },

    async adicionarProduto(produto: Omit<Produto, 'id'>) {
      this.loading = true;
      try {
        await ProdutoService.create(produto);
        this.listarProdutos();
        notify.show('Produto adicionado com sucesso!', 'success');
      } catch (error: any) {
        notify.show('Erro inesperado ao adicionar produto.', 'error');
      } finally {
        this.loading = false;
      }
    },

    async atualizarProduto(produto: Produto) {
      this.loading = true;
      try {
        await ProdutoService.update(produto);
        this.listarProdutos();
        notify.show('Produto atualizado com sucesso!', 'success');
      } catch (error: any) {
        notify.show('Erro inesperado ao atualizar produto.', 'error');
      } finally {
        this.loading = false;
      }
    },

    async deletarProduto(id: number) {
      this.loading = true;
      try {
        await ProdutoService.delete(id);
        this.listarProdutos();
        notify.show('Produto removido com sucesso!', 'success');
      } catch (error: any) {
        notify.show('Erro inesperado ao remover produto.', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
});