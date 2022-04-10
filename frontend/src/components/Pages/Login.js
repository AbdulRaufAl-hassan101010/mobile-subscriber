import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    if (response.error) return;

    const res = await axios.post("api/login", { token: response.tokenId });

    if (res.data === "success") navigate("/");
  };
  return (
    <>
      <Nav />
      <div className="login">
        <GoogleLogin
          clientId="342881308309-qqueprcai3n7e439aenm05u5on38l3e0.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="btn"
        />
      </div>
    </>
  );
};

export default Login;
