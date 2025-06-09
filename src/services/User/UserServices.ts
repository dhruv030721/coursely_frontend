import axios from "axios";
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
}

const userServices = new UserServices()

export default userServices;