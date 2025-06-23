const BASE_URL = import.meta.env.VITE_ENV_MODE === "DEV" 
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_ENV_MODE === "QA"
    ? import.meta.env.VITE_BACKEND_URL_QA
    : import.meta.env.VITE_BACKEND_URL_PROD;


export const UserEndPoints = {
    LOGIN: `${BASE_URL}/api/v1/login`,
    SIGNUP: `${BASE_URL}/api/v1/signup`,
    FORGOT_PASSWORD: `${BASE_URL}/api/v1/forgot_password`,
    CHANGE_PASSWORD: `${BASE_URL}/api/v1/change_password`,
    VERIFY_TOKEN: `${BASE_URL}/api/v1/verify_token`
}

export const WebEndPoints = {
    SUBSCRIBE: `${BASE_URL}/api/v1/subscribe`,
    CONTACT_US: `${BASE_URL}/api/v1/contactus`
}

