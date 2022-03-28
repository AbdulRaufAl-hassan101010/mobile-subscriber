import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    console.log(response);
    if (response.error) return;

    const res = await axios.post("api/login", { token: response.tokenId });

    console.log(res.data);

    if (res.data === "success") navigate("/");
  };
  return (
    <>
      <Nav />
      <div className="">
        <GoogleLogin
          clientId="905667393897-n7580bpumvad6jq5gfnn99j1g09o0r6e.apps.googleusercontent.com"
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
