<template>
  <v-dialog v-model="internalValue" max-width="450">
    <v-card title="Excluir Item">

      <v-card-text class="pt-4">
        Tem certeza que deseja excluir <strong>{{ itemName }}</strong>?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" @click="internalValue = false"> Cancelar </v-btn>
        <v-btn color="error" variant="elevated" @click="$emit('confirm')"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Definindo as Props
interface Props {
  modelValue: boolean;
  itemName?: string;
}

const props = defineProps<Props>();

// Definindo os Emits
const emit = defineEmits(['update:modelValue', 'confirm']);

// Computed para sincronizar o v-model do dialog com a prop do pai
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

</script>