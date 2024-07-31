<template>
  <v-container>
    <v-list>
      <v-list-item v-if="!filteredOrders.length">
        <v-list-item-title>Keine Einträge vorhanden</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="order in filteredOrders"
        :key="order.id"
        @click="selectOrder(order)"
        class="order-item"
      >
        <v-list-item-title>Name: {{ order.name }}</v-list-item-title>
        <v-list-item-subtitle>ID: {{ order.id }}</v-list-item-subtitle>
        <v-list-item-subtitle>Betrag: {{ order.total }} Euro</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
      :total-visible="5"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useOrderStore } from '../stores/orderStore'

const orderStore = useOrderStore()
const orders = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(5)

const emit = defineEmits(['order-selected'])

onMounted(() => {
  orders.value = orderStore.orders.list || []
})

watch(
  () => orderStore.orders.list,
  (newOrders) => {
    orders.value = newOrders || []
  }
)

const filteredOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return orders.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil((orders.value.length || 0) / itemsPerPage.value)
})

const selectOrder = (order) => {
  emit('order-selected', order)
}
</script>

<style scoped>
.order-item {
  cursor: pointer;
}
.mt-4 {
  margin-top: 16px;
}
</style>
