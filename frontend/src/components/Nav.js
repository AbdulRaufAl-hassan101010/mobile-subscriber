import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Models/Login";

const Nav = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const profile = await Login.getProfile();

      if (profile.error) return navigate("/login");
    })();
  }, []);

  return (
    <nav className="home-nav">
      <div className="container row j-content-sb a-items-center">
        <Link to="/" className="logo">
          MobileSubscriber
        </Link>
        <ul className="row">
          <li className="ml-1">
            <Link to="/subscribers" className="btn btn-primary">
              View Subscribers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
