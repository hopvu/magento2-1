/* istanbul ignore file */
import { computed, Ref, ref } from '@vue/composition-api';
import { CustomerAddress, ShippingMethod } from '@vue-storefront/magento-api';
import { User } from '../../types';

const PAYMENT_METHODS_MOCK = [{
  label: 'Visa Debit',
  value: 'debit',
}, {
  label: 'MasterCard',
  value: 'mastercard',
}, {
  label: 'Visa Electron',
  value: 'electron',
}, {
  label: 'Cash on delivery',
  value: 'cash',
}, {
  label: 'Check',
  value: 'check',
}];
const paymentMethods = ref<any[]>(PAYMENT_METHODS_MOCK);
const shippingMethods = ref<any[]>([]);
const personalDetails = ref<User>({});
const shippingDetails = ref<CustomerAddress>({});
const billingDetails = ref<CustomerAddress>({});
const chosenPaymentMethod = ref<string>('');
const chosenShippingMethod = ref<ShippingMethod>({});
const placeOrder = async () => {};
const loadDetails = async () => {};

// @todo CHECKOUT
const useCheckout: () => {
  chosenShippingMethod: Ref<ShippingMethod>;
  shippingDetails: Ref<CustomerAddress>;
  billingDetails: Ref<CustomerAddress>;
  chosenPaymentMethod: Ref<string>;
  placeOrder: () => Promise<any>;
  loadDetails: () => Promise<any>;
  paymentMethods: Ref<any[]>;
  personalDetails: Ref<User>;
  loading: Readonly<Ref<Readonly<boolean>>>;
  shippingMethods: Ref<any[]>;
} = () => ({
  paymentMethods,
  shippingMethods,
  personalDetails,
  shippingDetails,
  billingDetails,
  chosenPaymentMethod,
  chosenShippingMethod,
  placeOrder,
  loadDetails,
  loading: computed(() => false),
});

export default useCheckout;
