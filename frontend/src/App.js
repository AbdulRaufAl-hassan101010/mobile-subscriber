import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import ViewSubscribers from "./components/Pages/ViewSubscribers";
import Login from "./components/Pages/Login";
import EditSubscriber from "./components/Pages/EditSubscriber";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="subscribers">
              <Route path="" element={<ViewSubscribers />} />
            </Route>
            <Route path="/edit/:id" element={<EditSubscriber />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
