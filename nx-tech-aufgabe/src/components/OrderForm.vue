<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitOrder">
      <v-text-field v-model="order.orgId" label="Organisations-ID" required disabled></v-text-field>
      <v-text-field v-model="order.order.name" label="Name" required></v-text-field>
      <v-text-field
        v-model="order.order.duedate"
        type="date"
        label="Fälligkeitsdatum"
        required
      ></v-text-field>
      <v-text-field
        v-model="order.order.pickupdate"
        type="date"
        label="Abholdatum"
        required
      ></v-text-field>
      <v-text-field
        v-model="order.order.contactperson"
        label="Kontaktperson Email"
        required
      ></v-text-field>
      <v-text-field v-model="order.order.watcher" label="Beobachter Email" required></v-text-field>
      <v-select
        v-model="order.order.lang"
        :items="languages"
        item-value="code"
        item-text="name"
        label="Wählen Sie eine Sprache"
      />
      <v-text-field v-model="order.order.recipient" label="Empfänger" required></v-text-field>
      <v-text-field v-model="order.order.salutation" label="Anrede" required></v-text-field>
      <v-text-field v-model="order.order.reminder" label="Reminder" required></v-text-field>
      <v-text-field v-model="order.order.unique" label="Unique" required></v-text-field>
      <v-text-field v-model="order.order.uniquemodus" label="Unique Modus" required></v-text-field>

      <v-divider></v-divider>
      Assets
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="order.assets[0].label" label="Asset Label" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="order.assets[0].amount"
            label="Asset Amount"
            required
            type="number"
          />
        </v-col>
      </v-row>

      <v-btn type="submit" color="primary">Bestellung aufgeben</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useOrderStore } from '../stores/orderStore'
import { useToast } from 'vue-toastification'

const toast = useToast()
const orderStore = useOrderStore()
const form = ref(null)

const languages = [
  'Afrikaans',
  'Albanisch',
  'Amharisch',
  'Arabisch',
  'Armenisch',
  'Aserbaidschanisch',
  'Baskisch',
  'Bengalisch',
  'Birmanisch',
  'Bosnisch',
  'Bulgarisch',
  'Cebuano',
  'Chinesisch(traditionell)',
  'Chinesisch(vereinfacht)',
  'Dänisch',
  'Deutsch',
  'Englisch',
  'Xhosa',
  'Yoruba',
  'Zulu'
]

const order = ref({
  orgId: 'iATitCyb1',
  name: 'testing',
  order: {
    name: '',
    duedate: '',
    pickupdate: '',
    contactperson: '',
    watcher: '',
    lang: 'string',
    recipient: '',
    salutation: 'string',
    reminder: 'disabled',
    unique: 'string',
    uniquemodus: 'error',
    metafields: [],
    customer: {},
    vehicle: {},
    invoice: [],
    draft: false,
    tags: [],
    binaryattachment: []
  },
  assets: [
    {
      label: '',
      amount: '0'
    }
  ]
})

const submitOrder = async () => {
  if (form.value.validate()) {
    try {
      // Datumsfelder Konvertieren
      order.value.order.duedate = formatDate(order.value.order.duedate)
      order.value.order.pickupdate = formatDate(order.value.order.pickupdate)

      console.log(order.value)
      await orderStore.createOrder(order.value)
      emit('order-submitted')
      toast.success('Bestellung erfolgreich aufgegeben!')
    } catch (error) {
      console.log('Fehler beim Aufgeben der Bestellung', error)
      toast.error('Fehler beim Aufgeben der Bestellung: ' + error.message)
    }
  }
}

const formatDate = (date) => {
  const d = new Date(date)
  const month = `${d.getMonth() + 1}`.padStart(2, '0')
  const day = `${d.getDate()}`.padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}
</script>

<style scoped></style>
