import { defineStore } from 'pinia';
import { fetchOrderDetails, fetchOrders, createOrder } from '../helper/api';

/**
 * @typedef {Object} Metafield
 * @property {string} type
 * @property {string} desc
 */

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} type
 * @property {string} company
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} fullname
 * @property {string} street
 * @property {string} streetnumber
 * @property {string} zip
 * @property {string} city
 * @property {string} country
 * @property {string} email
 * @property {string} phone
 * @property {string} birthdate
 * @property {string} salutation
 * @property {string} gender
 * @property {string} title
 * @property {string} mobile
 * @property {string} fax
 * @property {string} billingstreet
 * @property {string} billingzip
 * @property {string} billingcity
 * @property {string} billingcountry
 */

/**
 * @typedef {Object} Vehicle
 * @property {string} vin
 * @property {string} manufacturer
 * @property {string} model
 * @property {string} licenseplate
 * @property {number} modelyear
 * @property {string} condition
 * @property {string} type
 * @property {string} mileage
 * @property {string} basiccolor
 * @property {string} damage
 * @property {string} registrationdate
 * @property {string} onofferfor
 * @property {string} modelcode
 * @property {string} optioncodes
 * @property {string} contractno
 * @property {boolean} insurance
 * @property {string} paymenttype
 * @property {string} currency
 */

/**
 * @typedef {Object} Invoice
 * @property {string} desc
 * @property {string} invoiceNo
 * @property {string} orderNumber
 * @property {string} debitor
 * @property {string} name
 * @property {number} amount
 * @property {string} duedate
 * @property {string} invoice_date
 */

/**
 * @typedef {Object} BinaryAttachment
 * @property {string} originalFilename
 * @property {string} mimetype
 * @property {string} buffer
 */

/**
 * @typedef {Object} Order
 * @property {string} orgId
 * @property {Object} order
 * @property {string} order.name
 * @property {string} order.duedate
 * @property {string} order.pickupdate
 * @property {string} order.contactperson
 * @property {string} order.watcher
 * @property {string} order.lang
 * @property {string} order.recipient
 * @property {string} order.salutation
 * @property {string} order.reminder
 * @property {string} order.unique
 * @property {string} order.uniquemodus
 * @property {Metafield[]} order.metafields
 * @property {Customer} order.customer
 * @property {Vehicle} order.vehicle
 * @property {Invoice[]} order.invoice
 * @property {boolean} order.draft
 * @property {string[]} order.tags
 * @property {string} order.location
 * @property {BinaryAttachment[]} order.binaryattachment
 * @property {Object[]} assets
 */

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    orderDetails: null,
    error: null
  }),
  actions: {
    async fetchOrders(orgId) {
      try {
        this.orders = await fetchOrders(orgId);
        this.error = null;
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        this.error = 'Failed to fetch orders. Please try again.';
        throw error;
      }
    },
    async fetchOrderDetails(orderId) {
      try {
        this.orderDetails = await fetchOrderDetails(orderId);
        this.error = null;
      } catch (error) {
        this.error = 'Failed to fetch order details. Please try again.';
        console.error('Failed to fetch order details:', error);
        throw error;
      }
    },
    async createOrder(orderPayload) {
      try {
        const response = await createOrder(orderPayload);
        this.error = null;
        await this.fetchOrders(orderPayload.orgId); // Refresh the order list
        return response;
      } catch (error) {
        console.error('Failed to create order:', error);
        this.error = 'Failed to create order. Please try again.';
        throw error;
      }
    },
  },
});
