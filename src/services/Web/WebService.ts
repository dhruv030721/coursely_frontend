import { apiConnector } from "../ApiConnector"
import { WebEndPoints } from "../Apis"
import { FieldValues } from "react-hook-form"

class WebServices {

    async Subscribe(data: FieldValues) {
        const response = await apiConnector({
            method: "GET",
            url: WebEndPoints.SUBSCRIBE,
            params: {
                email: data.email
            }
        })
        return response
    }

    async Contact(data: FieldValues) {
        const response = await apiConnector({
            method: "POST",
            url: WebEndPoints.CONTACT_US,
            bodyData: data
        })
        return response
    }
}


const webServices = new WebServices()
export default webServices