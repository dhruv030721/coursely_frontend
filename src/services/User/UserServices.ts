import { FieldValues } from "react-hook-form";
import { apiConnector } from "../ApiConnector";
import { UserEndPoints } from "../Apis";

interface LoginPayload {
    email: string;
    password: string;
}
class UserServices {

    async verifyToken(token: string) {
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.VERIFY_TOKEN,
            bodyData: { token }
        })
        return response;
    }

    async Login({ email, password }: LoginPayload): Promise<any> {
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.LOGIN,
            bodyData: { email, password }
        })

        if (response.status === 200) {
            localStorage.setItem("authToken", response.data.auth_token)
            localStorage.setItem("refreshToken", response.data.refresh_token)
        }
        return response;
    }

    async Signup(data: FieldValues) {
        const { name, email, password, age, contact } = data
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.SIGNUP,
            bodyData: { name, email, password, age, contact }
        })
        return response
    }

    async SendOTP(email: FieldValues) {

        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.FORGOT_PASSWORD,
            bodyData: { email }
        })
        return response
    }

    async ChangePassword(data: FieldValues) {
        const { email, otp, password } = data
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.CHANGE_PASSWORD,
            bodyData: { email, otp, password }
        })
        return response
    }
}

const userServices = new UserServices()

export default userServices;