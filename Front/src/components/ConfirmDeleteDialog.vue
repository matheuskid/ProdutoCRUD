<template>
  <v-dialog v-model="model" max-width="450">
    <v-card title="Excluir Item">

      <v-card-text class="pt-4">
        Tem certeza que deseja excluir <strong>{{ itemName }}</strong>?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="tonal" @click="model = false"> Cancelar </v-btn>
        <v-btn color="error" variant="elevated" @click="$emit('confirm')"> Excluir </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const model = defineModel<boolean>({ default: false });

defineProps<{ itemName: string }>();
defineEmits(['confirm']);

</script>