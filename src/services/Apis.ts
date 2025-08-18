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
  ADD_TO_CART: `${BASE_URL}/api/v1/cart`, // POST
  REMOVE_FROM_CART: `${BASE_URL}/api/v1/cart`, // DELETE
  GET_CART: `${BASE_URL}/api/v1/cart`, // GET,
  APPLY_DISCOUNT: `${BASE_URL}/api/v1/apply_discount`,
  GET_USER: `${BASE_URL}/api/v1/get_user`,
};

export const WebEndPoints = {
  SUBSCRIBE: `${BASE_URL}/api/v1/subscribe`,
  CONTACT_US: `${BASE_URL}/api/v1/contactus`,
  GET_COURSES: `${BASE_URL}/api/v1/admin/course`,
  GET_COURSE: `${BASE_URL}/api/v1/admin/course`,
  GET_DISCOUNT: `${BASE_URL}/api/v1/discount`,
};
