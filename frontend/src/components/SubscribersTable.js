import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubscriberPhone from "../Models/SubcriberPhone";
import User from "../Models/User";

const SubscribersTable = () => {
  const [subscribers, setSubscribers] = useState({});

  useEffect(() => {
    (async () => {
      const getSubscribers = await SubscriberPhone.getSubscribersPhones(
        "?sortedBy=_id:asc"
      );

      if (getSubscribers.error) {
        return;
      }

      setSubscribers(getSubscribers);
    })();
  }, []);

  const deleteSubscriberHandler = async (e) => {
    const id = e.target.closest("button").dataset.id;

    console.log(id);

    const subscriber = await User.deleteUser(id);

    if (subscriber.error) {
      console.log(subscriber);
    }

    // get subscribers
    const getSubscribers = await SubscriberPhone.getSubscribersPhones();

    if (getSubscribers.error) {
      return;
    }

    setSubscribers(getSubscribers);
  };

  const sortHandler = async (e) => {
    // get data type from html
    const { type, sort } = e.target.closest("th").dataset;

    // get subscribers
    const getSubscribers = await SubscriberPhone.getSubscribersPhones(
      `?sortBy=${type}:${sort}`
    );

    e.target.closest("th").dataset.sort = sort === "asc" ? "desc" : "asc";

    if (getSubscribers.error) {
      return;
    }

    setSubscribers(getSubscribers);
  };

  const searchHandler = async (e) => {
    const value = e.target.value;

    const getSearchResult = await SubscriberPhone.getSubscribersPhones(
      `?search=${value}`
    );

    setSubscribers(getSearchResult);
  };

  return (
    <section className="subscribers-table py-5">
      <div className="container card">
        <div className="form-group mb-1">
          <input
            className="form-control"
            placeholder="Search"
            onKeyUp={searchHandler}
          />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th data-type="_id" data-sort="asc" onClick={sortHandler}>
                  # <i className="fa-solid fa-arrow-down"></i>
                </th>
                <th>Username</th>
                <th>Email</th>
                <th>Subscriber_Phone</th>
                <th>Service_Type</th>
                <th>Owner</th>
                <th>Owner_Email</th>
                <th>Started_Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.subscriberPhones
                ? subscribers.subscriberPhones.map((details) => {
                    const {
                      customer_id_owner,
                      customer_id_user,
                      msisdn,
                      service_start_date,
                      service_type,
                      _id,
                    } = details;

                    return (
                      <tr key={_id}>
                        <td>{customer_id_user._id}</td>
                        <td>{customer_id_user.username}</td>
                        <td>{customer_id_user.email}</td>
                        <td>{msisdn}</td>
                        <td>{service_type}</td>
                        <td>{customer_id_owner.username}</td>
                        <td>{customer_id_owner.email}</td>
                        <td>{new Date(service_start_date).toDateString()}</td>
                        <td>
                          <Link
                            to={`/edit/${customer_id_user._id}`}
                            className="btn"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                          <button
                            className="btn"
                            data-id={customer_id_user._id}
                            onClick={deleteSubscriberHandler}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SubscribersTable;
