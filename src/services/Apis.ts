const BASE_URL =
  window.__APP_CONFIG__.VITE_ENV_MODE === 'DEV'
    ? window.__APP_CONFIG__.VITE_BACKEND_URL_DEV
    : window.__APP_CONFIG__.VITE_ENV_MODE === 'QA'
      ? window.__APP_CONFIG__.VITE_BACKEND_URL_QA
      : window.__APP_CONFIG__.VITE_BACKEND_URL_PROD;

export const UserEndPoints = {
  LOGIN: `${BASE_URL}/api/v1/login`,
  SIGNUP: `${BASE_URL}/api/v1/signup`,
  FORGOT_PASSWORD: `${BASE_URL}/api/v1/forgot_password`,
  CHANGE_PASSWORD: `${BASE_URL}/api/v1/change_password`,
  VERIFY_TOKEN: `${BASE_URL}/api/v1/verify_token`,
};

export const WebEndPoints = {
  SUBSCRIBE: `${BASE_URL}/api/v1/subscribe`,
  CONTACT_US: `${BASE_URL}/api/v1/contactus`,
};
