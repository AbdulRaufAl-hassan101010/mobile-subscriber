import axios from "axios";

class SubscriberPhone {
  static async createSubscriberPhone(data) {
    try {
      const subscriberPhones = await axios.post(`api/phones`, data);

      return subscriberPhones.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getSubscribersPhones(query = "") {
    try {
      const subscriberPhones = await axios.get(`api/phones${query}`);

      return subscriberPhones.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getSubscriberPhone(id) {
    try {
      const subscriberPhone = await axios(`api/phones/${id}`);

      return subscriberPhone.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateSubscriberPhone(id, data) {
    try {
      const subscriberPhones = await axios.patch(`api/phones/${id}`, data);

      return subscriberPhones.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteSubscriberPhone(id) {
    try {
      const subscriberPhones = await axios.delete(`api/phones/${id}`);

      return subscriberPhones.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default SubscriberPhone;
