import Nav from "../components/Nav";
import Showcase from "../components/Showcase";
import Statistics from "../components/Statistics";

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
