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
      @delete="deletarCategoria"
    />

    <v-dialog v-model="dialog" max-width="500">
      <v-card title="Nova Categoria">
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
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CategoriaStore } from '@/stores/CategoriaStore';
import CategoriaTable from '@/components/CategoriaTable.vue';

const store = CategoriaStore();
const dialog = ref(false);
const isEditMode = ref(false);
const categoria = ref({ id: 0, nome: '' }); // inciando com 0 para atualizarCategoria nao reclamar

onMounted(() => store.listarCategorias());

const salvar = async () => {
  if (isEditMode.value) {
    await store.atualizarCategoria(categoria.value);
  } else {
    await store.adicionarCategoria(categoria.value);
  }
  dialog.value = false;
};

const editarCategoria = (item: any) => {
  categoria.value = { ...item }; // Clona o item para não alterar a tabela direto
  isEditMode.value = true;
  dialog.value = true;
};

const deletarCategoria = async (id: number) => {
  if (confirm('Tem certeza que deseja remover esta categoria?')) {
    await store.deletarCategoria(id);
  }
};
</script>