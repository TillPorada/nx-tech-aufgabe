<template>
    <v-list>
      <v-list-item v-if="orders.length === 0">
          <v-list-item-title>Keine Einträge vorhanden</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="order in orders"
        :key="order.id"
        @click="selectOrder(order)"
        class="order-item"
        v-if="orders.length > 0"
      >
          <v-list-item-title>{{ order.customerName }}</v-list-item-title>
          <v-list-item-subtitle>{{ order.total }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    orders: {
      type: Array,
      required: true
    }
  });
  
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
  