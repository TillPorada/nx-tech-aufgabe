<template>
  <v-app>
    <v-container>
      <v-app-bar app>
        <v-toolbar-title>Bestellverwaltung</v-toolbar-title>
      </v-app-bar>
      <v-row class="content-section">
        <v-col cols="12">
          <div class="toolbar">
            <v-btn class="ml-2" color="primary" @click="dialog = true">Neue Bestellung</v-btn>
            <v-btn class="ml-2" color="secondary" @click="refreshOrders">Aktualisieren</v-btn>
          </div>
          <OrderList :orders="orderStore.orders" @order-selected="handleOrderSelected" />
        </v-col>
      </v-row>
      <v-row class="details-section">
        <v-col cols="12">
          <OrderDetails :order="orderStore.orderDetails" />
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Neue Bestellung</span>
          </v-card-title>
          <v-card-text>
            <OrderForm @order-submitted="handleOrderSubmitted" />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import OrderForm from '../components/OrderForm.vue'
import OrderDetails from '../components/OrderDetails.vue'
import OrderList from '../components/OrderList.vue'

const dialog = ref(false)
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
})

const refreshOrders = () => {
  orderStore.fetchOrders()
}

const handleOrderSubmitted = () => {
  dialog.value = false
  orderStore.fetchOrders()
}

const handleOrderSelected = (order) => {
  orderStore.fetchOrderDetails(order.id)
}
</script>

<style scoped>
.content-section {
  margin-top: 5rem;
}

.details-section {
  margin-top: 32px;
  height: calc(100vh - 300px);
  overflow: auto;
}

.toolbar {
    margin-bottom: 3rem;
    margin-top: 1rem;
}
</style>
