import { getInstance } from '../getInstance';

export const getLogo = (config) => {
  const instance = getInstance();
  // @ts-ignore
  const baseUrl = instance.$vsf.$magento?.config?.externalCheckout?.cmsUrl;
  const {
    header_logo_src: logoSrc,
    logo_alt: logoAlt,
    logo_height: logoHeight,
    logo_width: logoWidth,
  } = config;

  return {
    logoSrc: logoSrc ? `${baseUrl}/media/logo/${logoSrc}` : logoSrc,
    logoAlt,
    logoHeight,
    logoWidth,
  };
};
