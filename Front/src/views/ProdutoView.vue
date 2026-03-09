<template>
  <v-container>
    <v-row align="center" class="mb-4">
      <v-col><h1>Produtos</h1></v-col>
      <v-col class="text-right">
        <v-btn color="primary">Novo Produto</v-btn>
      </v-col>
    </v-row>

    <ProdutoTable 
      :items="store.produtos" 
      :loading="store.loading"
      @delete="handleDelete"
    />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ProdutoStore } from '@/stores/ProdutoStore';
import ProdutoTable from '@/components/ProdutoTable.vue';

const store = ProdutoStore();

const handleDelete = (id: number) => {
  if (confirm('Tem certeza?')) {
    store.deleteProduto(id);
  }
};

onMounted(() => {
  store.fetchProdutos();
});
</script>