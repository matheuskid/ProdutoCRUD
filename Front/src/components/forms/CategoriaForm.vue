<template>
  <v-form ref="formRef">
        <v-text-field 
        v-model="model.nome" 
        label="Nome da Categoria"
        variant="outlined"
        :rules = "[rules.required, rules.noEmpty]"
        ></v-text-field>
    </v-form>
</template>

<script setup lang="ts">

import { rules } from '@/utils/Rules';
import { ref } from 'vue';

const { model } = defineProps<{ model: any }>();
const formRef = ref<any>(null);

defineExpose({
  async validate() {
    return await formRef.value.validate();
  }
});

</script>