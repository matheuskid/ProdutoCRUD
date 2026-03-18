<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Categorias</h1>
      <v-btn color="primary" @click="abrirNova">
        <v-icon icon="mdi-plus-circle"></v-icon>
        <span class="d-none d-sm-inline ml-2">Nova Categoria</span>
      </v-btn>
    </div>
    
    <BaseTable
      :pagination="false"
      :headers="headers" 
      :items="categoriaStore.categorias"
      :loading="categoriaStore.loading"
      @edit="abrirEditar"
      @delete="abrirDelete"
    >
    </BaseTable>

    <BaseDialog
      v-model="dialog"
      :title = "isEditMode ? 'Editar Categoria' : 'Adicionar Categoria'"
      :loading="categoriaStore.loading"
      @save="validarESalvar"
      @close="fecharDialog"
      >
      <CategoriaForm ref="formRef" :model="categoria"></CategoriaForm>
    </BaseDialog>


    <ConfirmDeleteDialog
      v-model="dialogDelete"
      :item-name="categoria.nome"
      @confirm="deletarCategoria"
      />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CategoriaStore } from '@/stores/CategoriaStore';
import type { Categoria } from '@/services/CategoriaService';
import BaseDialog from '@/components/BaseDialog.vue';
import BaseTable from '@/components/BaseTable.vue';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import CategoriaForm from '@/components/forms/CategoriaForm.vue';

const categoriaStore = CategoriaStore();

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Ações', key: 'actions', sortable: false }
];

const dialog = ref(false);
const isEditMode = ref(false);
const dialogDelete = ref(false);
const formRef = ref<any>(null);

const criarCategoriaVazia = (): Categoria => ({ id: undefined, nome: '' });

const categoria = ref<Categoria>(criarCategoriaVazia());

onMounted(() => categoriaStore.listarCategorias());

const validarESalvar = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    salvar();
    fecharDialog();
  }
};

const abrirNova = () => {
  dialog.value = true;
}; 

const abrirEditar = (item: Categoria) => {
  categoria.value = JSON.parse(JSON.stringify(item));
  isEditMode.value = true;
  dialog.value = true;
};

const abrirDelete = (id: number, nome: string) => {
  categoria.value.id = id;
  categoria.value.nome = nome;
  dialogDelete.value = true;
};

const salvar = async () => {
  if (isEditMode.value) {
    await categoriaStore.atualizarCategoria(categoria.value);
  } else {
    await categoriaStore.adicionarCategoria(categoria.value);
  }
};

const deletarCategoria = async () => {
  if (categoria.value.id) {
    await categoriaStore.deletarCategoria(categoria.value.id);
    dialogDelete.value = false;
  }
  categoria.value = criarCategoriaVazia();
};

const fecharDialog = () => {
  dialog.value = false;
  isEditMode.value = false;
  categoria.value = criarCategoriaVazia();
};
</script>