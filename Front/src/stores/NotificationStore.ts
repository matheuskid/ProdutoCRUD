import { defineStore } from 'pinia';

export const NotificationStore = defineStore('notification', {
  state: () => ({
    visible: false,
    text: '',
    color: 'success'
  }),

  actions: {
    show(text: string, color: 'success' | 'error' = 'success') {
      this.text = text;
      this.color = color;
      this.visible = true;
    }
  }
});