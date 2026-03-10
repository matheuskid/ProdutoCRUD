<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Categorias</h1>
      <v-btn color="primary" @click="dialog = true">Nova Categoria</v-btn>
    </div>
    
    <CategoriaTable 
      :items="store.categorias" 
      :loading="store.loading"
      @edit="editarCategoria"
      @delete="abrirDelete"
    />

    <v-dialog v-model="dialog" max-width="500">
      <v-card :title="isEditMode ? 'Editar Categoria' : 'Nova Categoria'">
        <v-card-text>
          <v-text-field 
            v-model="categoria.nome" 
            label="Nome da Categoria"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialog = false, isEditMode = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="400">
      <v-card title="Excluir Categoria">
        <v-card-text>
          Tem certeza que deseja excluir a categoria <strong>{{ categoria.nome }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="error" @click="deletarCategoria">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CategoriaStore } from '@/stores/CategoriaStore';
import CategoriaTable from '@/components/CategoriaTable.vue';
import type { Categoria } from '@/services/CategoriaService';

const store = CategoriaStore();
const dialog = ref(false);
const isEditMode = ref(false);
const categoria = ref<Categoria>({ nome: '' });
const dialogDelete = ref(false);

onMounted(() => store.listarCategorias());

const salvar = async () => {
  if (isEditMode.value) {
    await store.atualizarCategoria(categoria.value);
  } else {
    await store.adicionarCategoria(categoria.value);
  }
  dialog.value = false;
  isEditMode.value = false;
  categoria.value = { nome: '' };
};

const editarCategoria = (item: Categoria) => {
  categoria.value = { ...item }; // Clona o item para não alterar a tabela direto
  isEditMode.value = true;
  dialog.value = true;
};

const deletarCategoria = async () => {
  if (categoria.value.id) {
    await store.deletarCategoria(categoria.value.id);
    dialogDelete.value = false;
  }
};

const abrirDelete = (id: number, nome: string) => {
  categoria.value.id = id;
  categoria.value.nome = nome;
  dialogDelete.value = true;
};
</script>