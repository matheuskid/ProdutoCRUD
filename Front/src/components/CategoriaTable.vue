<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    class="elevation-1"
  >
    <template #item.actions="{ item }">
      <slot name="actions" :item="item" />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Categoria } from '@/services/CategoriaService';

defineProps<{
  items: Categoria[];
  loading: boolean;
}>();

const headers = [
  { title: 'Nome', key: 'nome' },
  { title: 'Ações', key: 'actions', sortable: false }
];
</script>