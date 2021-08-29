<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader
        :is-wishlist-enabled="isWishlistEnabled"
        :logo-config="logoConfig"
      />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar v-if="isWishlistEnabled" />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter />
    </LazyHydrate>
  </div>
</template>

<script>
import { onSSR } from '@vue-storefront/core';
import { useConfig } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import AppFooter from '~/components/AppFooter.vue';
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import Notification from '~/components/Notification';
import TopBar from '~/components/TopBar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import { getHtmlHead } from '~/helpers/hooks/useConfig/getHtmlHead.ts';
import { getLogo } from '~/helpers/hooks/useConfig/getLogo.ts';

export default {
  name: 'DefaultLayout',
  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },
  setup(_, ctx) {
    const {
      config,
      loading,
      loadConfig,
    } = useConfig();

    onSSR(async () => {
      await loadConfig();
    });
    const logoObj = getLogo(config.value);
    const logoConfig = {
      logoAlt: logoObj.logoAlt || 'Vue Storefront Next',
      logoSrc: logoObj.logoSrc || '/icons/logo.svg',
      logoWidth: logoObj.logoWidth || '',
      logoHeight: logoObj.logoHeight || '',
    };

    return {
      config,
      loading,
      logoConfig,
      isWishlistEnabled: computed(() => +config?.value?.magento_wishlist_general_is_enabled === 1),
    };
  },
  head() {
    const {
      title,
      description,
      keywords,
      icon,
      lang,
      titlePrefix,
      titleSeparator,
      titleSuffix,
    } = getHtmlHead(this.config);

    const meta = [];
    const link = [];
    const titleTemplate = `${titlePrefix !== null ? (`${titlePrefix} `) : ''}${titlePrefix !== null ? (`${titleSeparator} `) : ''}%s${titleSuffix !== null ? (` ${titleSeparator} `) : ''}${titleSuffix !== null ? (`${titleSuffix}`) : ''}`;

    meta.push({
      hid: 'description',
      name: 'description',
      content: description || '',
    }, {
      hid: 'keywords',
      name: 'keywords',
      content: keywords || '',
    }, {
      hid: 'og:title',
      name: 'og:title',
      content: title,
    }, {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: title,
    }, {
      hid: 'og:description',
      name: 'og:description',
      content: description || '',
    }, {
      hid: 'i18n-og',
      name: 'og:locale',
      content: lang,
    });

    link.push({
      hid: 'icon',
      rel: 'icon',
      type: 'image/x-icon',
      href: icon || '/favicon.ico',
    }, {
      hid: 'shortcut-icon',
      rel: 'shortcut-icon',
      href: icon || '/favicon.ico',
    });

    return {
      title,
      titleTemplate,
      meta,
      htmlAttrs: {
        lang,
      },
      link,
    };
  },
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}

body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: var(--c-link);

  &:hover {
    color: var(--c-link-hover);
  }
}

h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}

h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}

h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}

h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
