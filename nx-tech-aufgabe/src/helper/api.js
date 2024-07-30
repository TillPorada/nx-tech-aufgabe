import axios from 'axios'

const NX_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9ocU1NQ0xZRyIsImVtYWlsIjoidGlsbEBhZGFyb3AuZGUiLCJ1dWlkIjoiNTI2YWE4MTYtN2IwNi00MmM5LWEyZTUtZjAxOWI0NTU1MmY5IiwiaWF0IjoxNzIyMzUzNzcyLCJleHAiOjE3MjI0NDAxNzJ9.Xlt3OI4die4PZAeaXqk2Nko88yNdlnXwL2YAOXUj5XQ'

/**
 * Alle Order bekommen.
 * @returns {Promise<Array>}
 */
export async function fetchOrders() {
  const response = await axios.get('https://partnerapi.staging.bezahl.de/api/nxt/v1/order', {
    headers: { 'NX-Token': NX_TOKEN, 'Content-Type': 'application/json' },
    withCredentials: true,
    changeOrigin: true,	
  })
  return response.data
}

/**
 * Ein Order über die ID bekommen.
 * @param {number} orderId
 * @returns {Promise<Order>}
 */
export async function fetchOrderDetails(orderId) {
  const response = await axios.get(`https://partnerapi.staging.bezahl.de/api/nxt/v1/order/${orderId}`, {
    headers: { 'NX-Token': NX_TOKEN },
    baseURL: 'https://partnerapi.staging.bezahl.de',
    withCredentials: true,
    mode: 'no-cors'
  })
  return response.data
}

/**
 * Neue Order erstellen.
 * @param {Object} orderPayload
 * @returns {Promise<Object>}
 */
export async function createOrder(orderPayload) {
  const response = await axios.post(
    'api/nxt/v1/order/plan',
    orderPayload,
    {
      headers: {
        'NX-Token': NX_TOKEN,
        'Content-Type': 'application/json'
      },
      baseURL: 'https://partnerapi.staging.bezahl.de',
      withCredentials: true,
      mode: 'no-cors'
    }
  )
  return response.data
}
