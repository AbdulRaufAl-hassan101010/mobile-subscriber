import axios from "axios";

class Login {
  static async getProfile() {
    try {
      const res = await axios("/api/profile");
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default Login;
