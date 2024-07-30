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
        <v-list dense>
          <v-list-item>
            <v-icon>mdi-calendar-today</v-icon>
            <v-list-item-title>Fälligkeitsdatum</v-list-item-title>
            <v-list-item-subtitle>{{ order.duedate }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-calendar-range</v-icon>
            <v-list-item-title>Abholdatum</v-list-item-title>
            <v-list-item-subtitle>{{ order.pickupdate }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-account</v-icon>
            <v-list-item-title>Kontaktperson</v-list-item-title>
            <v-list-item-subtitle>{{ order.contactperson }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-eye</v-icon>
            <v-list-item-title>Beobachter</v-list-item-title>
            <v-list-item-subtitle>{{ order.watcher }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-language</v-icon>
            <v-list-item-title>Sprache</v-list-item-title>
            <v-list-item-subtitle>{{ order.lang }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-email</v-icon>
            <v-list-item-title>Empfänger</v-list-item-title>
            <v-list-item-subtitle>{{ order.recipient }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-account-outline</v-icon>
            <v-list-item-title>Anrede</v-list-item-title>
            <v-list-item-subtitle>{{ order.salutation }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-bell</v-icon>
            <v-list-item-title>Erinnerung</v-list-item-title>
            <v-list-item-subtitle>{{ order.reminder }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-tag</v-icon>
            <v-list-item-title>Einzigartig</v-list-item-title>
            <v-list-item-subtitle>{{ order.unique }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-tag-multiple</v-icon>
            <v-list-item-title>Einzigartig Modus</v-list-item-title>
            <v-list-item-subtitle>{{ order.uniquemodus }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-icon>mdi-map-marker</v-icon>
            <v-list-item-title>Ort</v-list-item-title>
            <v-list-item-subtitle>{{ order.location }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
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
import { defineProps } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>
