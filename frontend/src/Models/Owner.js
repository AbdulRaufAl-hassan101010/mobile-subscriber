import axios from "axios";

class Owner {
  static async createOwner(data) {
    try {
      const user = await axios.post("api/owners", data);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getOwners() {
    try {
      const user = await axios.get(`api/owners`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getOwner(id) {
    try {
      const user = await axios.get(`api/owners/${id}`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateOwner(id, data) {
    try {
      const user = await axios.patch(`api/owners/${id}`, data);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteOwner(id) {
    try {
      const user = await axios.delete(`api/owners/${id}`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default Owner;
