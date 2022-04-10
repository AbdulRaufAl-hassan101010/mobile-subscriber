import { useState } from "react";
import User from "../models/User";
import Owner from "../models/Owner";
import SubscriberPhone from "../models/SubcriberPhone";

const AddSubscriberForm = () => {
  const [ownerForm, setOwnerForm] = useState(false);

  const toggleOwnerFormHandler = (e) => {
    const value = e.target.value;
    setOwnerForm(value.toLowerCase() === "no");
  };

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

  const createSubscriberHandler = async (e) => {
    e.preventDefault();

    // get form data
    const data = new FormData(e.target);
    const {
      customer_user_username,
      customer_user_email,
      customer_owner_username,
      customer_owner_email,
      msisdn,
      service_type,
      isOwner,
    } = Object.fromEntries(data.entries());

    // save user
    const user = await User.createUser({
      username: customer_user_username,
      email: customer_user_email,
    });

    if (user.error) {
      notification(
        `username or user email already exist`,
        `notification-error`
      );
      return;
    }

    // save owner
    const owner = await Owner.createOwner({
      username:
        isOwner === "no" ? customer_owner_username : customer_user_username,
      email: isOwner === "no" ? customer_owner_email : customer_user_email,
    });

    if (owner.error) {
      await User.deleteUser(user._id);
      notification(
        `owner name or owner email already exist`,
        `notification-error`
      );
      return;
    }

    // update user id field
    const updateUser = await User.updateUser(user._id, { owner: owner._id });

    if (updateUser.error) {
      // delete user and owner from database if owner id is not updated
      await User.deleteUser(user._id);
      await Owner.deleteOwner(owner._id);

      // display error message
      notification(`Something went wrong try again`, `notification-error`);
      return;
    }

    // create subcriber
    const subcriber = await SubscriberPhone.createSubscriberPhone({
      customer_id_owner: owner._id,
      customer_id_user: user._id,
      msisdn,
      service_type,
    });

    if (subcriber.error) {
      await User.deleteUser(user._id);
      await Owner.deleteOwner(owner._id);

      // display error message
      notification(`Phone Number already exist`, `notification-error`);
      return;
    }

    // display success message
    notification(`Subcriber has been added :)`, `notification-success`);

    // reset form
  };
  return (
    <form className="showcase-form card" onSubmit={createSubscriberHandler}>
      <h2>ADD SUBSCRIBER</h2>
      <div className="notification">Hello</div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Enter Subscriber Name"
          name="customer_user_username"
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Enter Subscriber Email"
          name="customer_user_email"
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Enter Subscriber Phone Number, Eg; +233******"
          name="msisdn"
          required
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          onChange={toggleOwnerFormHandler}
          name="service_type"
          required
        >
          <option value="">Service Type</option>
          <option value="MOBILE_POSTPAID">MOBILE_POSTPAID</option>
          <option value="MOBILE_PREPAID">MOBILE_PREPAID</option>
        </select>
      </div>
      <div className="form-group">
        <select
          className="form-control"
          onChange={toggleOwnerFormHandler}
          name="isOwner"
          required
        >
          <option value="">Are you the owner of the phone?</option>
          <option value="yes">Yes, I Am</option>
          <option value="no">No, I Am Not</option>
        </select>
      </div>

      {!ownerForm ? null : (
        <div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Enter Owner's Name"
              name="customer_owner_username"
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Enter Owner's Email"
              name="customer_owner_email"
              required
            />
          </div>
        </div>
      )}
      <button className="btn btn-primary btn-block">Add Subscriber</button>
    </form>
  );
};

export default AddSubscriberForm;
