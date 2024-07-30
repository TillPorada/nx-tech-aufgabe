<template>
  <v-container>
    <v-form ref="form" @submit.prevent="submitOrder">
      <v-text-field v-model="order.orgId" label="Organisations-ID" required></v-text-field>
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
        label="Kontaktperson"
        required
      ></v-text-field>
      <v-text-field v-model="order.order.watcher" label="Beobachter" required></v-text-field>
      <v-select
        v-model="order.order.lang"
        :items="languages"
        item-value="code"
        item-text="name"
        label="Wählen Sie eine Sprache"
      />
      <v-text-field v-model="order.order.recipient" label="Empfänger" required></v-text-field>
      <v-text-field v-model="order.order.salutation" label="Anrede" required></v-text-field>
      <v-text-field v-model="order.order.location" label="Ort" required></v-text-field>
      <v-btn type="submit" color="primary">Bestellung aufgeben</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useOrderStore } from '../stores/orderStore'

const orderStore = useOrderStore()
const form = ref(null)

const languages = [
"Afrikaans",
"Albanisch",
"Amharisch",
"Arabisch",
"Armenisch",
"Aserbaidschanisch",
"Baskisch",
"Bengalisch",
"Birmanisch",
"Bosnisch",
"Bulgarisch",
"Cebuano",
"Chinesisch(traditionell)",
"Chinesisch(vereinfacht)",
"Dänisch",
"Deutsch",
"Englisch",
"Esperanto",
"Estnisch",
"Filipino",
"Finnisch",
"Französisch",
"Galizisch",
"Georgisch",
"Griechisch",
"Gujarati",
"Haiti-Kreolisch",
"Haussa",
"Hawaiisch",
"Hebräisch",
"Hindi",
"Hmong",
"Igbo",
"Indonesisch",
"Irisch",
"Isländisch",
"Italienisch",
"Japanisch",
"Javanisch",
"Jiddisch",
"Kannada",
"Kasachisch",
"Katalanisch",
"Khmer",
"Kirgisisch",
"Koreanisch",
"Korsisch",
"Kroatisch",
"Kurdisch",
"Laotisch",
"Latein",
"Lettisch",
"Litauisch",
"Luxemburgisch",
"Madagassisch",
"Malaiisch",
"Malayalam",
"Maltesisch",
"Maori",
"Marathi",
"Mazedonisch",
"Mongolisch",
"Nepalesisch",
"Niederländisch",
"Norwegisch",
"Nyanja-Sprache",
"Paschtu",
"Persisch",
"Polnisch",
"Portugiesisch",
"Punjabi",
"Rumänisch",
"Russisch",
"Samoanisch",
"Schottisches Gälisch",
"Schwedisch",
"Serbisch",
"Shona",
"Sindhi",
"Singhalesisch",
"Slowakisch",
"Slowenisch",
"Somali",
"Spanisch",
"Suaheli",
"Sundanesisch",
"Tadschikisch",
"Tamil",
"Telugu",
"Thailändisch",
"Tschechisch",
"Türkisch",
"Ukrainisch",
"Ungarisch",
"Urdu",
"Usbekisch",
"Vietnamesisch",
"Walisisch",
"Weißrussisch",
"Westfriesisch",
"Xhosa",
"Yoruba",
"Zulu"];

const order = ref({
  orgId: '',
  order: {
    name: '',
    duedate: '',
    pickupdate: '',
    contactperson: '',
    watcher: '',
    lang: '',
    recipient: '',
    salutation: '',
    metafields: [],
    customer: {},
    vehicle: {},
    invoice: [],
    draft: false,
    tags: [],
    location: '',
    binaryattachment: []
  },
  assets: [{}]
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
    } catch (error) {
      console.log('Fehler beim Aufgeben der Bestellung')
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
