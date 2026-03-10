<template>
  <v-data-table
    :headers="headers" 
    :items="items" 
    :loading="loading"
    class="elevation-1">

    <template #item.categoria="{ item }">
      {{ item.categoria.nome }}
    </template>

    <template #item.actions="{ item }">
    <div class="d-flex align-center">
        <v-btn
        icon="mdi-pencil"
        variant="text"
        color="primary"
        size="small"
        density="comfortable"
        @click="$emit('edit', item)"
        title="Editar"
        />
        
        <v-btn
        icon="mdi-delete"
        variant="text"
        color="error"
        size="small"
        density="comfortable"
        @click="$emit('delete', item.id, item.nome)"
        title="Remover"
        />
    </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Produto } from '@/services/ProdutoService';

defineProps<{ items: Produto[]; loading: boolean }>();
defineEmits(['delete', 'edit']);

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Preço', key: 'preco' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Ações', key: 'actions', sortable: false }
];
</script>