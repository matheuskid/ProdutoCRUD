<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Produtos</h1>
      <v-btn color="primary" @click="abrirNovo">
        <v-icon icon="mdi-plus-circle"></v-icon>
        <span class="d-none d-sm-inline ml-2">Novo Produto</span>
      </v-btn>
    </div>

    <BaseTable
      :pagination="true"
      v-model:items-per-page="produtoStore.size"
      :page="produtoStore.page + 1"
      :headers="headers"
      :items="produtoStore.produtos"
      :total-items="produtoStore.totalItems"
      :loading="produtoStore.loading"
      @edit="abrirEditar"
      @delete="abrirDelete"
      @update:options="atualizaPaginacao"
    >
      <template #item.preco="{ item }">
        R$ {{ item.preco }}
      </template>

      <template #item.categoria="{ item }">
        {{ item.categoria.nome }}
      </template>
    </BaseTable>

    <BaseDialog
      v-model="dialog"
      :title = "isEditMode ? 'Editar Produto' : 'Adicionar Produto'"
      :loading="produtoStore.loading"
      @save="validarESalvar"
      @close="fecharDialog"
      >
      <ProdutoForm ref="formRef" :model="produto"></ProdutoForm>
    </BaseDialog>
      
    <ConfirmDeleteDialog
      v-model="dialogDelete"
      :item-name="produto.nome"
      @confirm="deletarProduto"
      />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProdutoStore } from '@/stores/ProdutoStore';
import { CategoriaStore } from '@/stores/CategoriaStore';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import BaseTable from '@/components/BaseTable.vue';
import type { Produto } from '@/services/ProdutoService';
import ProdutoForm from '@/components/forms/ProdutoForm.vue';
import BaseDialog from '@/components/BaseDialog.vue';

const produtoStore = ProdutoStore();
const categoriaStore = CategoriaStore();

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Preço', key: 'preco' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Ações', key: 'actions', sortable: false }
];

const dialog = ref(false);
const dialogDelete = ref(false);
const isEditMode = ref(false);
const formRef = ref<any>(null);

const criarProdutoVazio = (): Produto => ({
  id: undefined,
  nome: '',
  preco: '',
  categoria: { id: undefined, nome: '' }
});

const produto = ref<Produto>(criarProdutoVazio());

onMounted(() => {
  produtoStore.listarProdutos();
  categoriaStore.listarCategorias();
});

const atualizaPaginacao = (options: any) => {
  produtoStore.page = options.page - 1;
  produtoStore.size = options.itemsPerPage;
  produtoStore.totalItems = options.itemsLength;
  produtoStore.listarProdutos();
};

const validarESalvar = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    salvar();
    fecharDialog();
  }
};

const abrirNovo = () => {
  dialog.value = true;
};

const abrirEditar = (item: Produto) => {
  produto.value = JSON.parse(JSON.stringify(item));
  isEditMode.value = true;
  dialog.value = true;
};

const abrirDelete = (id: number, nome: string) => {
  produto.value.id = id;
  produto.value.nome = nome;
  dialogDelete.value = true;
};

const salvar = async () => {
  if (isEditMode.value) {
    await produtoStore.atualizarProduto(produto.value);
  } else {
    await produtoStore.adicionarProduto(produto.value);
  }
};

const deletarProduto = async () => {
  if (produto.value.id) {
    await produtoStore.deletarProduto(produto.value.id);
    dialogDelete.value = false;
  }
  produto.value = criarProdutoVazio();
};

const fecharDialog = () => {
  dialog.value = false;
  isEditMode.value = false;
  produto.value = criarProdutoVazio();
};
</script>