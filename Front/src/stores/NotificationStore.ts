import { defineStore } from 'pinia';
import { nextTick } from 'vue';

export const NotificationStore = defineStore('notification', {
  state: () => ({
    visible: false,
    text: '',
    color: 'success'
  }),

  actions: {
    show(text: string, color: string) {
      this.visible = false; // Fecha a anterior instantaneamente
      nextTick(() => {
        this.text = text;
        this.color = color;
        this.visible = true; // Abre a nova no próximo ciclo
      });
    }
  }
});