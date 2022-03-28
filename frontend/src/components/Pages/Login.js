import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
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
          clientId="905667393897-fk9qq7rgbucgt3lr7c7t2fe8qu4j0vcb.apps.googleusercontent.com"
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
