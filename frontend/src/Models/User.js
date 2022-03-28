import axios from "axios";

class User {
  static async createUser(data) {
    try {
      const user = await axios.post("api/users", data);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getUsers() {
    try {
      const user = await axios.get(`api/users`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getUser(id) {
    try {
      const user = await axios.get(`api/users/${id}`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async updateUser(id, data) {
    try {
      const user = await axios.patch(`api/users/${id}`, data);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await axios.delete(`api/users/${id}`);

      return user.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default User;
