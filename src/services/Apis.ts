const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const UserEndPoints = {
    LOGIN: `${BASE_URL}/api/v1/login`,
    SIGNUP: `${BASE_URL}/api/v1/signup`,
}

export const AdminEndPoints = {

}

