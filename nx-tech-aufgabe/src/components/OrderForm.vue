<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitOrder">
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
      Zahlung hinzufügen
      <v-row v-for="(asset, index) in order.assets" :key="index" class="align-center">
        <v-col cols="12" md="5">
          <v-text-field v-model="asset.label" label="Position" required />
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            v-model="asset.amount"
            label="Preis"
            required
            type="number"
          />
        </v-col>
        <v-col cols="12" md="2" class="d-flex align-center justify-end">
          <v-btn icon small @click="addAsset" class="mr-2">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon small @click="removeAsset(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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

const emit = defineEmits(['order-submitted']);

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

const addAsset = () => {
  order.value.assets.push({ label: '', amount: '0' });
};

const removeAsset = (index) => {
  order.value.assets.splice(index, 1);
};
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>
