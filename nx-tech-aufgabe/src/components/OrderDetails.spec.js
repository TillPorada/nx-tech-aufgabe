import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import OrderDetails from '@/components/OrderDetails.vue';  // Pfad anpassen

describe('OrderDetails.vue', () => {
  const order = {
    name: 'Test Order',
    createDate: '2023-07-31',
    paymentdata: {
      reference: 'REF12345'
    },
    status: 'In Bearbeitung',
    watchers: ['Watcher1', 'Watcher2'],
    recipient: ['Recipient1', 'Recipient2'],
    organization: {
      name: 'Test Organization',
      bankaccounts: [
        { iban: 'DE1234567890' },
      ]
    },
    total: 1000
  };

  it('renders order details correctly', () => {
    const wrapper = mount(OrderDetails, {
      props: { order }
    });

    const title = wrapper.find('.headline');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Bestelldetails');

    const createDate = wrapper.findAll('v-list-item-subtitle').at(0);
    expect(createDate.exists()).toBe(true);

  });

  it('renders "Keine Bestellung ausgewählt" message when order is null', () => {
    const wrapper = mount(OrderDetails, {
      props: { order: null }
    });

    const noOrderTitle = wrapper.find('.headline');
    expect(noOrderTitle.exists()).toBe(true);
    expect(noOrderTitle.text()).toBe('Keine Bestellung ausgewählt');

  });


});
