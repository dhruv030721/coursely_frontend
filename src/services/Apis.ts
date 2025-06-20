const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const UserEndPoints = {
    LOGIN: `${BASE_URL}/api/v1/login`,
    SIGNUP: `${BASE_URL}/api/v1/signup`,
    FORGOT_PASSWORD: `${BASE_URL}/api/v1/forgot_password`,
    CHANGE_PASSWORD: `${BASE_URL}/api/v1/change_password`
}


