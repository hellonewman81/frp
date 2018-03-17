const baseUrlMagento = process.env.BASE_URL;
const baseUrl = process.env.NODE_ENV === 'production' ? baseUrlMagento : '';

export const BASE_URL_MAGENTO = '';
export const BASE_URL = baseUrl;
