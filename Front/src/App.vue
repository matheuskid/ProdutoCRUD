<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Meu Sistema de Estoque</v-toolbar-title>
    </v-app-bar>

    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.visible = false">Fechar</v-btn>
      </template>
    </v-snackbar>

    <v-navigation-drawer v-model="drawer" app :temporary="isMobile">
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
  import { ref, computed } from 'vue'
  import { useDisplay } from 'vuetify'

  import { NotificationStore } from '@/stores/NotificationStore';

  const snackbar = NotificationStore();
  const { mobile } = useDisplay()
  const drawer = ref(true)

  const isMobile = computed(() => mobile.value)
</script>

<style>
body {
  margin: 0;
}
</style>