<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Categorias</h1>
      <v-btn color="primary" @click="dialog = true">Nova Categoria</v-btn>
    </div>
    
    <CategoriaTable 
      :items="store.categorias" 
      :loading="store.loading"
    />

    <v-dialog v-model="dialog" max-width="500">
      <v-card title="Nova Categoria">
        <v-card-text>
          <v-text-field 
            v-model="novaCategoria.nome" 
            label="Nome da Categoria"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="dialog = false">Cancelar</v-btn>
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
const novaCategoria = ref({ nome: '' });

onMounted(() => store.fetchCategorias());

const salvar = async () => {
  await store.criarCategoria(novaCategoria.value);
  dialog.value = false;
  novaCategoria.value.nome = ''; // Limpa o formulário
};
</script>