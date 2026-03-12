<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Produtos</h1>
      <v-btn color="primary" @click="abrirNovo">Novo Produto</v-btn>
    </div>

    <ProdutoTable 
      :items="produtoStore.produtos" 
      :loading="produtoStore.loading"
      @edit="abrirEdtiar"
      @delete="abrirDelete"
    />

    <v-dialog v-model="dialog" max-width="600">
      <v-card :title="isEditMode ? 'Editar Produto' : 'Novo Produto'">
        <v-card-text>
          <v-form ref="formRef">
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  v-model="produto.nome"
                  :rules = "[rules.required, rules.noEmpty]"
                  label="Nome do Produto" 
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field 
                  v-model="produto.preco" 
                  :rules = "[rules.required, rules.positivo, rules.isNumber]"
                  label="Preço" 
                  prefix="R$"
                  type="number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="produto.categoria" 
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="fecharDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="validarESalvar">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ConfirmDeleteDialog
      v-model="dialogDelete"
      :item-name="produto.nome"
      @confirm="deletarProduto"
      />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ProdutoStore } from '@/stores/ProdutoStore';
import { CategoriaStore } from '@/stores/CategoriaStore';
import ProdutoTable from '@/components/ProdutoTable.vue';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue';
import type { Produto } from '@/services/ProdutoService';
import { rules } from '@/utils/Rules';

const produtoStore = ProdutoStore();
const categoriaStore = CategoriaStore();

const dialog = ref(false);
const dialogDelete = ref(false);
const isEditMode = ref(false);
const formRef = ref<any>(null);

const criarProdutoVazio = (): Produto => ({
  nome: '',
  preco: '',
  categoria: { nome: '' }
});

// Inicialização seguindo o padrão que discutimos
const produto = ref<Produto>(criarProdutoVazio());

onMounted(() => {
  produtoStore.listarProdutos();
  categoriaStore.listarCategorias();
});

const validarESalvar = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    salvar();
    fecharDialog();
  }
};

const abrirNovo = () => {
  isEditMode.value = false;
  produto.value = criarProdutoVazio();
  dialog.value = true;
};

const abrirEdtiar = (item: Produto) => {
  produto.value = JSON.parse(JSON.stringify(item));
  isEditMode.value = true;
  dialog.value = true;
};

const abrirDelete = (id: number, nome: string) => {
  produto.value.id = id;
  produto.value.nome = nome;
  dialogDelete.value = true;
};

const salvar = async () => {
  if (isEditMode.value) {
    await produtoStore.atualizarProduto(produto.value);
  } else {
    await produtoStore.adicionarProduto(produto.value);
  }
};

const deletarProduto = async () => {
  if (produto.value.id) {
    await produtoStore.deletarProduto(produto.value.id);
    dialogDelete.value = false;
  }
  produto.value = criarProdutoVazio();
};

const fecharDialog = () => {
  dialog.value = false;
  isEditMode.value = false;
  produto.value = criarProdutoVazio();
};
</script>