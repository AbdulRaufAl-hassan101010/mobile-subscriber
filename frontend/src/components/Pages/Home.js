import Nav from "../Nav";
import Showcase from "../Showcase";
import Statistics from "../Statistics";

const Home = () => {
  function onSignIn(googleUser) {}

  return (
    <>
      <Nav />
      <Showcase />
      <Statistics />
      <div
        className="g-signin2"
        data-onsuccess="onSignIn"
        onClick={onSignIn}
      ></div>
    </>
  );
};

export default Home;
