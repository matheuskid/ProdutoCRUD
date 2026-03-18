<template>
    <v-dialog v-model="model" max-width="600">
        <v-card :title="title">
        <v-card-text>
            <slot></slot>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="$emit('close'), model = false">Cancelar</v-btn>
            <v-btn color="primary" @click="$emit('save')">Salvar</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  modelValue: boolean;
  title: string;
  loading?: boolean;
}>(), {
  loading: false
});

const model = defineModel<boolean>({ default: false });

defineEmits(['update:modelValue', 'save', 'close']);

</script>
