<template>
  <component
    :is="tableComponent"
    v-model:items-per-page="itemsPerPage"
    :page="page"
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-length="totalItems"
    @update:options="$emit('update:options', $event)"
  >

    <template v-for="(_, name) in $slots" v-slot:[name]="slotData"> <!-- Cria slots personalizados (vindos do pai) -->
      <slot :name="name" v-bind="slotData"></slot>
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2">
        <v-btn 
          icon="mdi-pencil" 
          variant="text" 
          color="blue" 
          @click="$emit('edit', item)"
        ></v-btn>
        
        <v-btn 
          icon="mdi-delete" 
          variant="text" 
          color="red" 
          @click="$emit('delete', item.id, item.nome)"
        ></v-btn>
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const itemsPerPage = defineModel<number>('itemsPerPage', { default: 10 });

const tableComponent = computed(() => 
  props.pagination ? 'v-data-table-server' : 'v-data-table'
);

const props = withDefaults(defineProps<{
  headers: any[],
  items: any[],
  page?: number,
  totalItems?: number,
  loading: boolean,
  pagination: boolean
}>(), {
  page: 1,             
  totalItems: 0,     
  loading: false,
  pagination: true,
  items: () => []
});

defineEmits(['edit', 'delete', 'update:options', 'update:itemsPerPage']);

</script>