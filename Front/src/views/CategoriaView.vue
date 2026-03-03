<template>
  <v-container>
    <h1>Gerenciamento de Categorias</h1>
    
    <CategoriaTable 
      :items="store.categorias" 
      :loading="store.loading"
    >
      <template #actions="{ item }">
        <v-btn icon size="small" color="primary">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </CategoriaTable>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { CategoriaStore } from '@/stores/CategoriaStore';
import CategoriaTable from '@/components/CategoriaTable.vue';

const store = CategoriaStore();

onMounted(() => {
  store.fetchCategorias();
});
</script>