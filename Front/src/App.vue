<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Meu Sistema de Estoque</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item 
          prepend-icon="mdi-view-dashboard" 
          title="Categorias" 
          to="/categorias"
        ></v-list-item>
        
        <v-list-item 
          prepend-icon="mdi-package-variant" 
          title="Produtos" 
          to="/produtos"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Por enquanto, não precisamos de lógica aqui, 
// apenas a estrutura do layout.
</script>

<style>
body {
  margin: 0;
}
</style>