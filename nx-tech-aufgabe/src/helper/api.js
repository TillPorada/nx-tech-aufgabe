import axios from 'axios'

const NX_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im9ocU1NQ0xZRyIsImVtYWlsIjoidGlsbEBhZGFyb3AuZGUiLCJ1dWlkIjoiOTA2NzliYTktZjI4YS00MTI1LTliNTEtNjcxMTE0NTQ0MmQzIiwiaWF0IjoxNzIyNDQzMDIzLCJleHAiOjE3MjUwMzUwMjN9.eaW6ciCTVNgE7xh09HY47GB-AhSuxle3irEaes-oU1c'

const ORG_ID = await fetchOrgId();

/**
 * Fetch the active organization for the user.
 * @returns {Promise<string>}
 */
export async function fetchOrgId() {
  const response = await axios.get('https://partnerapi.staging.bezahl.de/nxt/v1/user', {
    headers: { 'NX-Token': NX_TOKEN, 'Content-Type': 'application/json' }
  })
  const { activeOrganization } = response.data
  return activeOrganization
}

/**
 * Fetch orders by org ID.
 * @param {string} orgId
 * @returns {Promise<Array>}
 */
export async function fetchOrders(orgId) {
  const response = await axios.get(
    `https://partnerapi.staging.bezahl.de/nxt/v1/order?orgId=${ORG_ID}&limit=50`,
    {
      headers: { 'NX-Token': NX_TOKEN, 'Content-Type': 'application/json' }
    }
  )
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
  return response.data
}

/**
 * Create a new order.
 * @param {Object} orderPayload
 * @returns {Promise<Object>}
 */
export async function createOrder(orderPayload) {
  const payloadWithOrgId = { ...orderPayload, orgId: ORG_ID }

  const response = await axios.post(
    'https://partnerapi.staging.bezahl.de/nxt/v1/order',
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
