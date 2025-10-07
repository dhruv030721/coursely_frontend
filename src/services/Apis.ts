const BASE_URL =
  import.meta.env.VITE_ENV_MODE === 'DEV'
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_ENV_MODE === 'QA'
      ? import.meta.env.VITE_BACKEND_URL_QA
      : import.meta.env.VITE_BACKEND_URL_PROD;

export const UserEndPoints = {
  LOGIN: `${BASE_URL}/api/v1/login`,
  LOGOUT: `${BASE_URL}/api/v1/logout`,
  SIGNUP: `${BASE_URL}/api/v1/signup`,
  FORGOT_PASSWORD: `${BASE_URL}/api/v1/forgot_password`,
  CHANGE_PASSWORD: `${BASE_URL}/api/v1/change_password`,
  VERIFY_TOKEN: `${BASE_URL}/api/v1/verify_token`,
  ADD_TO_CART: `${BASE_URL}/api/v1/cart`, // POST
  REMOVE_FROM_CART: `${BASE_URL}/api/v1/cart`, // DELETE
  GET_CART: `${BASE_URL}/api/v1/cart`, // GET,
  APPLY_DISCOUNT: `${BASE_URL}/api/v1/apply_discount`,
  GET_USER: `${BASE_URL}/api/v1/get_user`,
  GENERATE_ORDER_ID: `${BASE_URL}/api/v1/payment/create_order`,
  REGISTER_PAYMENT: `${BASE_URL}/api/v1/payment`,
  GET_MY_COURSES: `${BASE_URL}/api/v1/my_courses`,
  UPDATE_USER: `${BASE_URL}/api/v1/update_user`,
  CREATE_REVIEW: `${BASE_URL}/api/v1/create_review`,
};

export const WebEndPoints = {
  HOME: `${BASE_URL}/api/v1/homepage`,
  SUBSCRIBE: `${BASE_URL}/api/v1/subscribe`,
  CONTACT_US: `${BASE_URL}/api/v1/contactus`,
  GET_COURSES: `${BASE_URL}/api/v1/admin/course`,
  GET_COURSE: `${BASE_URL}/api/v1/admin/course`,
  GET_DISCOUNT: `${BASE_URL}/api/v1/discount`,
};
