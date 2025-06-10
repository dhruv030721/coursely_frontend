import { FieldValues } from "react-hook-form";
import { apiConnector } from "../ApiConnector";
import { UserEndPoints } from "../Apis";

interface LoginPayload {
    email: string;
    password: string;
}
class UserServices {

    async Login({ email, password }: LoginPayload): Promise<any> {
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.LOGIN,
            bodyData: { email, password }
        })
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
}

const userServices = new UserServices()

export default userServices;