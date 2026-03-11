<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Categorias</h1>
      <v-btn color="primary" @click="abrirNova">Nova Categoria</v-btn>
    </div>
    
    <CategoriaTable 
      :items="store.categorias" 
      :loading="store.loading"
      @edit="abrirEditar"
      @delete="abrirDelete"
    />

    <v-dialog v-model="dialog" max-width="500">
      <v-card :title="isEditMode ? 'Editar Categoria' : 'Nova Categoria'">
        <v-card-text>
          <v-form ref="formRef">
          <v-text-field 
            v-model="categoria.nome" 
            label="Nome da Categoria"
            variant="outlined"
            :rules = "[rules.required, rules.noEmpty]"
          ></v-text-field>
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
      :item-name="categoria.nome"
      @confirm="deletarCategoria"
      />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CategoriaStore } from '@/stores/CategoriaStore';
import CategoriaTable from '@/components/CategoriaTable.vue';
import type { Categoria } from '@/services/CategoriaService';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import { rules } from '@/utils/Rules';

const store = CategoriaStore();
const dialog = ref(false);
const isEditMode = ref(false);
const dialogDelete = ref(false);
const formRef = ref<any>(null);

const criarCategoriaVazia = (): Categoria => ({ nome: '' });

const categoria = ref<Categoria>(criarCategoriaVazia());

onMounted(() => store.listarCategorias());

const validarESalvar = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    salvar();
    fecharDialog();
  }
};

const abrirNova = () => {
  isEditMode.value = false;
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
    await store.atualizarCategoria(categoria.value);
  } else {
    await store.adicionarCategoria(categoria.value);
  }
};

const deletarCategoria = async () => {
  if (categoria.value.id) {
    await store.deletarCategoria(categoria.value.id);
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