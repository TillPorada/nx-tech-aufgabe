<template>
  <v-container>
    <v-card v-if="order" class="pa-4" outlined>
      <v-card-title>
        <span class="headline">Bestelldetails</span>
      </v-card-title>
      <v-card-subtitle class="pb-2">
        <v-icon>mdi-package-variant</v-icon>
        <span class="ml-2">{{ order.name }}</span>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-calendar-today</v-icon>
              <v-list-item-title>Erstellungsdatum</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(order.createDate) }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-arrow-bottom-right</v-icon>
              <v-list-item-title>Referenz</v-list-item-title>
              <v-list-item-subtitle>{{ order.paymentdata?.reference }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-clock</v-icon>
              <v-list-item-title>Status</v-list-item-title>
              <v-list-item-subtitle>{{ order.status || 'Nicht angegeben' }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-eye</v-icon>
              <v-list-item-title>Beobachter</v-list-item-title>
              <v-list-item-subtitle>{{ order.watchers.length ? order.watchers.join(', ') : 'Keine' }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-email</v-icon>
              <v-list-item-title>Empfänger</v-list-item-title>
              <v-list-item-subtitle>{{ order.recipient.length ? order.recipient.join(', ') : 'Keine' }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-car</v-icon>
              <v-list-item-title>Händler</v-list-item-title>
              <v-list-item-subtitle>{{ order.organization?.name || 'Nicht angegeben' }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-cash</v-icon>
              <v-list-item-title>Preis</v-list-item-title>
              <v-list-item-subtitle>{{ formatPrice(order.total) }}</v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <v-list-item>
              <v-icon>mdi-bank</v-icon>
              <v-list-item-title>Bankkonto</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.organization?.bankaccounts.length ? order.organization.bankaccounts.map(acc => acc.iban).join(', ') : 'Nicht angegeben' }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else class="pa-4" outlined>
      <v-card-title>
        <span class="headline">Keine Bestellung ausgewählt</span>
      </v-card-title>
      <v-card-text>
        <v-alert type="info" colored-border>
          Bitte wählen Sie eine Bestellung aus, um die Details anzuzeigen.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  order: {
    type: Object,
    default: null
  }
});

const formatDate = (dateString) => {
  if (!dateString) return 'Nicht angegeben';
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE');
};

const formatPrice = (price) => {
  return price ? `${price.toFixed(2)} €` : 'Nicht angegeben';
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>
