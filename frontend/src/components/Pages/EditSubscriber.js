import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../../Models/User";
import Owner from "../../Models/Owner";
import SubscriberPhone from "../../Models/SubcriberPhone";

const EditSubscriber = () => {
  const [ownerForm, setOwnerForm] = useState(false);
  const params = useParams();

  const notification = (message, classType) => {
    const $el = document.querySelector(".notification");

    // added message to notificatiom
    $el.textContent = message;

    // set notification color
    $el.classList.add(classType);

    setTimeout(() => {
      // set notification color
      $el.classList.remove(classType);
    }, 3000);
  };

  useEffect(() => {
    //   get form data and place them in the fields
    (async () => {
      console.log(params.id);
      const subscriberInfo = await SubscriberPhone.getSubscribersPhones(
        params.id
      );

      if (subscriberInfo.error) {
        notification(`server error`, `notification-error`);
      }

      console.log(subscriberInfo);

      console.log(document.querySelector(`.showcase-form `).service_type);
    })();
  }, []);
  return (
    <form className="showcase-form card">
      <h2>UPDATE SUBSCRIBER</h2>
      <div className="notification"></div>

      <div className="form-group">
        <select className="form-control" name="service_type" required>
          <option value="">Service Type</option>
          <option value="MOBILE_POSTPAID">MOBILE_POSTPAID</option>
          <option value="MOBILE_PREPAID">MOBILE_PREPAID</option>
        </select>
      </div>

      <button className="btn btn-primary btn-block">Update Subscriber</button>
    </form>
  );
};

export default EditSubscriber;
