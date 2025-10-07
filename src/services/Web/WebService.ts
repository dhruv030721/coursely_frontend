import { FieldValues } from 'react-hook-form';
import { apiConnector } from '../ApiConnector';
import { WebEndPoints } from '../Apis';

class WebServices {

  async HomeData() {
    const response = await apiConnector({
      method: 'GET',
      url: WebEndPoints.HOME,
    });
    return response;
  }

  async Subscribe(data: FieldValues) {
    const response = await apiConnector({
      method: 'GET',
      url: WebEndPoints.SUBSCRIBE,
      params: {
        email: data.email,
      },
    });
    return response;
  }

  async Contact(data: FieldValues) {
    const response = await apiConnector({
      method: 'POST',
      url: WebEndPoints.CONTACT_US,
      bodyData: data,
    });
    return response;
  }

  async GetCourses() {
    const response = await apiConnector({
      method: 'GET',
      url: WebEndPoints.GET_COURSES,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    return response;
  }

  async GetDiscount() {
    const response = await apiConnector({
      method: 'GET',
      url: WebEndPoints.GET_DISCOUNT
    });
    return response;
  }
}
const webServices = new WebServices();
export default webServices;
