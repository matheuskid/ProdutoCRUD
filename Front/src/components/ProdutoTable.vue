<template>
  <v-data-table :headers="headers" :items="items" :loading="loading">
    <template #item.categoria="{ item }">
      {{ item.categoria.nome }}
    </template>

    <template #item.actions="{ item }">
      <v-btn icon size="small" color="error" @click="$emit('delete', item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Produto } from '@/services/ProdutoService';

defineProps<{ items: Produto[]; loading: boolean }>();
defineEmits(['delete']);

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Preço', key: 'preco' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Ações', key: 'actions', sortable: false }
];
</script>