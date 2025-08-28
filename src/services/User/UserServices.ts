import { FieldValues } from "react-hook-form";
import { apiConnector, apiConnectorWithToken } from "../ApiConnector";
import { UserEndPoints } from "../Apis";
import { RegisterPaymentPayload } from "@/utility/interfaces"

interface LoginPayload {
    email: string;
    password: string;
}
class UserServices {

    async GetUser(email: string) {
        const response = await apiConnectorWithToken({
            method: "GET",
            url: `${UserEndPoints.GET_USER}/${email}`
        })

        return response;
    }

    async VerifyToken() {
        const response = await apiConnectorWithToken({
            method: "GET",
            url: UserEndPoints.VERIFY_TOKEN
        })
        return response;
    }

    async Login({ email, password }: LoginPayload): Promise<any> {
        const response: any = await apiConnector({
            method: "POST",
            url: UserEndPoints.LOGIN,
            bodyData: { email, password }
        })

        if (response.status === 200) {
            localStorage.setItem("authToken", response.data.auth_token)
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

    async AddToCart(email: string, courseId: string) {
        const response = await apiConnectorWithToken({
            method: 'POST',
            url: UserEndPoints.ADD_TO_CART,
            bodyData: { email, courseId }
        })

        return response
    }

    async RemoveFromCart(email: string, courseId: string) {
        const response = await apiConnectorWithToken({
            method: 'DELETE',
            url: UserEndPoints.REMOVE_FROM_CART,
            bodyData: { email, courseId }
        })

        return response
    }

    async GetCart(email: string) {
        const response = await apiConnectorWithToken({
            method: 'GET',
            url: `${UserEndPoints.GET_CART}?email=${email}`,
        })

        return response
    }

    async ApplyDiscount(code: string) {
        const response = await apiConnectorWithToken({
            method: 'GET',
            url: `${UserEndPoints.APPLY_DISCOUNT}?discountCode=${code}`,
        })

        return response
    }

    async GenerateOrderID(amount: number) {
        const response = await apiConnectorWithToken({
            method: 'POST',
            url: UserEndPoints.GENERATE_ORDER_ID,
            bodyData: { amount }
        })

        return response
    }

    async RegisterPayment({ email, items, razorpayPaymentId, razorpayOrderId, receiptId, amount, status }: RegisterPaymentPayload) {
        const response = await apiConnectorWithToken({
            method: 'POST',
            url: UserEndPoints.REGISTER_PAYMENT,
            bodyData: { email, items, razorpayPaymentId, razorpayOrderId, receiptId, amount, status }
        })

        return response
    }

    async GetMyCourses(email: string) {
        const response = await apiConnectorWithToken({
            method: 'GET',
            url: `${UserEndPoints.GET_MY_COURSES}/${email}`,
        })

        return response
    }

}

const userServices = new UserServices()

export default userServices;