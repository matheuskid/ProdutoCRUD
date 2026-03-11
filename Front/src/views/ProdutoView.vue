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
          <v-row>
            <v-col cols="12">
              <v-text-field 
                v-model="produto.nome" 
                label="Nome do Produto" 
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field 
                v-model="produto.preco" 
                label="Preço" 
                prefix="R$"
                type="number"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="produto.categoria.id" 
                :items="categoriaStore.categorias"
                item-title="nome"
                item-value="id"
                label="Categoria"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="fecharDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="salvar">Salvar</v-btn>
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

const produtoStore = ProdutoStore();
const categoriaStore = CategoriaStore();

const dialog = ref(false);
const dialogDelete = ref(false);
const isEditMode = ref(false);

// Inicialização seguindo o padrão que discutimos
const produto = ref<any>({nome: '', preco: '', categoria: { nome: '' }});

onMounted(() => {
  produtoStore.listarProdutos();
  categoriaStore.listarCategorias();
});

const abrirNovo = () => {
  isEditMode.value = false;
  produto.value = { id: null, nome: '', preco: '', categoria: { id: null, nome: '' } };
  dialog.value = true;
};

const abrirEdtiar = (item: any) => {
  produto.value = JSON.parse(JSON.stringify(item));
  isEditMode.value = true;
  dialog.value = true;
};

const salvar = async () => {
  if (isEditMode.value) {
    await produtoStore.atualizarProduto(produto.value);
  } else {
    await produtoStore.adicionarProduto(produto.value);
  }
  fecharDialog();
};

const fecharDialog = () => {
  dialog.value = false;
  isEditMode.value = false;
  produto.value = {id: null, nome: '', preco: '', categoria: { id: null, nome: '' } };
};

const abrirDelete = (id: number, nome: string) => {
  produto.value.id = id;
  produto.value.nome = nome;
  dialogDelete.value = true;
};

const deletarProduto = async () => {
  if (produto.value.id) {
    await produtoStore.deletarProduto(produto.value.id);
    dialogDelete.value = false;
  }
};
</script>