import axios from 'axios'

const NX_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9ocU1NQ0xZRyIsImVtYWlsIjoidGlsbEBhZGFyb3AuZGUiLCJ1dWlkIjoiNTI2YWE4MTYtN2IwNi00MmM5LWEyZTUtZjAxOWI0NTU1MmY5IiwiaWF0IjoxNzIyMzUzNzcyLCJleHAiOjE3MjI0NDAxNzJ9.Xlt3OI4die4PZAeaXqk2Nko88yNdlnXwL2YAOXUj5XQ'

const ORG_ID = 'iATitCyb1'


/**
 * Fetch orders by org ID.
 * @param {string} orgId
 * @returns {Promise<Array>}
 */
export async function fetchOrders(orgId) {
  const response = await axios.get(`https://partnerapi.staging.bezahl.de/nxt/v1/order?orgId=${ORG_ID}`, {
    headers: { 'NX-Token': NX_TOKEN, 'Content-Type': 'application/json' }
  })
  return response.data
}

/**
 * Fetch order details by order ID.
 * @param {number} orderId
 * @returns {Promise<Object>}
 */
export async function fetchOrderDetails(orderId) {
  const response = await axios.get(`https://partnerapi.staging.bezahl.de/nxt/v1/order/${orderId}`, {
    headers: { 'NX-Token': NX_TOKEN }
  })
  console.log("Updated Details");
  return response.data
}

/**
 * Create a new order.
 * @param {Object} orderPayload
 * @returns {Promise<Object>}
 */
export async function createOrder(orderPayload) {
  // Add orgId to the orderPayload
  const payloadWithOrgId = { ...orderPayload, orgId: ORG_ID }

  const response = await axios.post(
    'https://partnerapi.staging.bezahl.de/nxt/v1/order/plan',
    payloadWithOrgId,
    {
      headers: {
        'NX-Token': NX_TOKEN,
        'Content-Type': 'application/json'
      }
    }
  )
  return response.data
}
