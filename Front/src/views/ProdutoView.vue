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
      v-model:items-per-page="itemsPerPage"
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
    

    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="isEditMode ? 'Editar Produto' : 'Novo Produto'">
        <v-card-text>
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  v-model="produto.nome"
                  :rules = "[rules.required, rules.noEmpty]"
                  label="Nome do Produto" 
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field 
                  v-model="produto.preco" 
                  :rules = "[rules.required, rules.positivo, rules.isNumber]"
                  label="Preço" 
                  prefix="R$"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="produto.categoria" 
                  :items="categoriaStore.categorias"
                  :rules = "[rules.required]"
                  item-title="nome"
                  return-object
                  label="Categoria"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="fecharDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="validarESalvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { rules } from '@/utils/Rules';

const produtoStore = ProdutoStore();
const categoriaStore = CategoriaStore();
const itemsPerPage = ref(10);

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

// Inicialização seguindo o padrão que discutimos
const produto = ref<Produto>(criarProdutoVazio());

onMounted(() => {
  produtoStore.listarProdutos(0, itemsPerPage.value);
  categoriaStore.listarCategorias();
});

const atualizaPaginacao = (options: any) => {
  const { page, itemsPerPage } = options;
  produtoStore.listarProdutos(page - 1, itemsPerPage);
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