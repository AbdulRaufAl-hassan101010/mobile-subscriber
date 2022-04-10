import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ViewSubscribers from "../pages/ViewSubscribers";
import Login from "../pages/Login";
import EditSubscriber from "../pages/EditSubscriber";

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
