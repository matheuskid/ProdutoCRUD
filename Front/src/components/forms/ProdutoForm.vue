<template>
    <v-form ref="formRef">
        <v-row>
            <v-col cols="12">
            <v-text-field 
                v-model="model.nome"
                :rules = "[rules.required, rules.noEmpty]"
                label="Nome do Produto" 
                variant="outlined"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-text-field 
                v-model="model.preco" 
                :rules = "[rules.required, rules.positivo, rules.isNumber]"
                label="Preço" 
                prefix="R$"
                type="number"
                variant="outlined"
            ></v-text-field>
            </v-col>
            <v-col cols="6">
            <v-select
                v-model="model.categoria" 
                :items="categoriaStore.categorias"
                :rules = "[rules.required]"
                item-title="nome"
                return-object
                label="Categoria"
                variant="outlined"
            ></v-select>
            </v-col>
        </v-row>
    </v-form>
</template>   

<script setup lang="ts">

import { CategoriaStore } from '@/stores/CategoriaStore';
import { rules } from '@/utils/Rules';
import { ref } from 'vue';

const categoriaStore = CategoriaStore();

const { model } = defineProps<{ model: any }>();
const formRef = ref<any>(null);

defineExpose({
  async validate() {
    return await formRef.value.validate();
  }
});


</script>