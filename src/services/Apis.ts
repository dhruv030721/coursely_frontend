const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export const UserEndPoints = {
    LOGIN: `/api/v1/login`,
    SIGNUP: `/api/v1/signup`,
    SEND_OTP: `/api/v1/send_otp`
}

export const AdminEndPoints = {

}

