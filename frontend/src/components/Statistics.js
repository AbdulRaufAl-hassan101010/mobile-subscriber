import { useEffect, useState } from "react";
import SubscriberPhone from "../models/SubcriberPhone";

const Statistics = (props) => {
  const [postpaid, setPostpaid] = useState();
  const [prepaid, setPrepaid] = useState();
  const [subscribers, setSubscribers] = useState();

  useEffect(() => {
    (async () => {
      const postpaid = await SubscriberPhone.getSubscribersPhones(
        "?service_type=MOBILE_POSTPAID"
      );

      const prepaid = await SubscriberPhone.getSubscribersPhones(
        "?service_type=MOBILE_PREPAID"
      );

      const subscribers = await SubscriberPhone.getSubscribersPhones();

      setPostpaid(postpaid.count);
      setPrepaid(prepaid.count);
      setSubscribers(subscribers.count);
    })();
  }, [setPostpaid, setPrepaid, setSubscribers]);

  return (
    <section className="py-5" id="statistics">
      <div className="container">
        <h3>Statistics</h3>
        <div className="statistics-wrapper row j-content-sb gap-1 text-center">
          <article className="card">
            <h2 className="text-primary">{subscribers}</h2>
            <h4>Total Numbers Collected</h4>
            <i className="fa-solid fa-users fa-2x text-dark-grey"></i>
          </article>
          <article className="card">
            <h2 className="text-primary">{prepaid}</h2>
            <h4>Number Of Prepaid Users</h4>
            <i className="fa-solid fa-credit-card fa-2x text-dark-grey"></i>
          </article>
          <article className="card">
            <h2 className="text-primary">{postpaid}</h2>
            <h4>Number Of Postpaid Users</h4>
            <i className="fa-solid fa-money-bill fa-2x text-dark-grey"></i>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
