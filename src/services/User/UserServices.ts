import axios from "axios";
import { apiConnector } from "../ApiConnector";
import { UserEndPoints } from "../Apis";

interface LoginPayload {
    Email: string;
    Password: string;
}
class UserServices {

    async Login({ Email, Password }: LoginPayload): Promise<any> {
        const response = await apiConnector({
            method: "POST",
            url: UserEndPoints.LOGIN,
            bodyData: { Email, Password }
        })
        return response;
    }
}

const userServices = new UserServices()

export default userServices;