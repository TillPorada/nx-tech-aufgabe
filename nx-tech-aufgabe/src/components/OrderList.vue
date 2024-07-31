<template>
  
  <v-list>
    <v-list-item v-if="!orders || orders.length === 0">
      <v-list-item-title>Keine Einträge vorhanden</v-list-item-title>
    </v-list-item>
    <v-list-item
      v-for="order in orders"
      :key="order.id"
      @click="selectOrder(order)"
      class="order-item"
      v-else
    >
      <v-list-item-title>Name: {{ order.name }}</v-list-item-title>
      <v-list-item-subtitle>ID: {{ order.id }}</v-list-item-subtitle>
      <v-list-item-subtitle>Betrag: {{ order.total }} Euro</v-list-item-subtitle>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '../stores/orderStore';
import { watch } from 'vue';

const orderStore = useOrderStore();
const orders = ref([]);
const emit = defineEmits(['order-selected']);


onMounted(() => {
  orders.value = orderStore.orders.list;
});

watch(() => orderStore.orders.list, (newOrders) => {
  orders.value = newOrders;
});

const selectOrder = (order) => {
  emit('order-selected', order);
};
</script>

<style scoped>
.order-item {
  cursor: pointer;
}
</style>
