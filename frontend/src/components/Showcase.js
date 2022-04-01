import AddSubscriberForm from "./AddSubscriberForm";

const Showcase = () => {
  return (
    <header className="home-showcase mb-1">
      <div className="overlay">
        <div className="container row a-items-center j-content-sb">
          <div className="showcase-text">
            <h1 className="font-primary">
              Welcome To The Mobile Subscriber Platform
            </h1>
            <a href="#statistics" className="btn btn-primary">
              Explore Statistics
            </a>
          </div>
          <AddSubscriberForm />
        </div>
      </div>
    </header>
  );
};

export default Showcase;
