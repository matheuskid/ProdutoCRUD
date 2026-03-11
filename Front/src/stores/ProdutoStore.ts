import { defineStore } from 'pinia';
import { ProdutoService, type Produto } from '@/services/ProdutoService';
import { NotificationStore } from '@/stores/NotificationStore';

const notify = NotificationStore();

export const ProdutoStore = defineStore('produto', {
  state: () => ({
    produtos: [] as Produto[],
    loading: false
  }),
  actions: {
    async listarProdutos() {
      this.loading = true;
      try {
        const { data } = await ProdutoService.getAll();
        this.produtos = data;
      } finally {
        this.loading = false;
      }
    },

    async adicionarProduto(produto: Omit<Produto, 'id'>) {
      this.loading = true;
      try {
        const { data } = await ProdutoService.create(produto);
        this.produtos.push(data);
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
        const { data } = await ProdutoService.update(produto);
        const index = this.produtos.findIndex((p) => p.id === produto.id);
        if (index !== -1) {
          this.produtos[index] = data;
        }
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
        this.produtos = this.produtos.filter((p) => p.id !== id);
        notify.show('Produto removido com sucesso!', 'success');
      } catch (error: any) {
        notify.show('Erro inesperado ao remover produto.', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
});