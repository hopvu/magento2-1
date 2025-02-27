import {
  Context,
  Logger,
  useBillingFactory,
  UseBillingParams,
} from '@vue-storefront/core';
import {
  SetBillingAddressOnCartInput,
} from '@vue-storefront/magento-api';
import useCart from '../useCart';
import useShippingProvider from '../useShippingProvider';

const factoryParams: UseBillingParams<any, any> = {
  provide() {
    return {
      useShippingProvider: useShippingProvider(),
      cart: useCart(),
    };
  },

  load: async (context: Context, { customQuery }) => {
    Logger.debug('[Magento] loadBilling');

    if (!context.cart.cart?.value?.billing_address) {
      await context.cart.load({ customQuery });
    }

    return context.cart.cart.value.billing_address;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    Logger.debug('[Magento] setBillingAddress');
    const { id } = context.cart.cart.value;

    const {
      apartment,
      sameAsShipping,
      ...address
    } = params.billingDetails;

    const setBillingAddressOnCartInput: SetBillingAddressOnCartInput = {
      cart_id: id,
      billing_address: {
        address: {
          ...address,
          street: [address.street, apartment],
        },
        same_as_shipping: sameAsShipping,
      },
    };

    const { data } = await context.$magento.api.setBillingAddressOnCart(setBillingAddressOnCartInput);

    Logger.debug('[Result]:', { data });

    /**
     * This is a workaround needed due to Magento GraphQL API
     * cleaning the Shipping method after defining the billing address
     */
    const shippingMethod = context.useShippingProvider.state.value;

    Logger.debug('[Magento]: Defining the shipping method as:', JSON.stringify(shippingMethod, null, 2));

    await context.useShippingProvider.save({
      shippingMethod: {
        carrier_code: shippingMethod.carrier_code,
        method_code: shippingMethod.method_code,
      },
    });
    /**
     * End of GraphQL Workaround
     */

    return data.setBillingAddressOnCart.cart.billing_address;
  },
};

export default useBillingFactory<any, any>(factoryParams);
