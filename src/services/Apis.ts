const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const UserEndPoints = {
    LOGIN: `/api/v1/login`,
    SIGNUP: `/api/v1/signup`,
    FORGOT_PASSWORD: `/api/v1/forgot_password`,
    CHANGE_PASSWORD: `/api/v1/change_password`
}

export const AdminEndPoints = {

}

