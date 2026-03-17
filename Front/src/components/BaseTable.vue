<template>
  <v-data-table :headers="headers" :items="items" :loading>
    
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
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

  </v-data-table>
</template>

<script setup lang="ts">

defineProps<{ headers: any[], items: any[], loading: boolean }>();
defineEmits(['edit', 'delete']);

</script>