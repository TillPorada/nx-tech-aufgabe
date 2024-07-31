<template>
    <v-list>
      <v-list-item v-if="orders">
          <v-list-item-title>Keine Einträge vorhanden</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="order in orders"
        :key="order.id"
        @click="selectOrder(order)"
        class="order-item"
        v-if="orders.length > 0"
      >
          <v-list-item-title>ID: {{ order.id }}</v-list-item-title>
          <v-list-item-subtitle>Name: {{ order.name }}</v-list-item-subtitle>
          <v-list-item-subtitle>Betrag: {{ order.total }} Euro</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue';
  import { useOrderStore } from '../stores/orderStore';

  const orderStore = useOrderStore();
  const orders = ref([]);

  onMounted(() => {
      orders.value = orderStore.orders.list;
  });
  
  const props = defineProps();
  
  const emit = defineEmits(['order-selected']);
  
  const selectOrder = (order) => {
    emit('order-selected', order);
  };
  </script>
  
  <style scoped>
  .order-item {
    cursor: pointer;
  }
  </style>
  