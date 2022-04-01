const mongoose = require("mongoose");
const { phone } = require("phone");

const subscriberPhoneSchema = new mongoose.Schema({
  _id: Number,
  customer_id_owner: {
    type: Number,
    required: true,
    ref: "Owner",
  },
  customer_id_user: {
    type: Number,
    required: true,
    ref: "User",
  },
  service_type: {
    type: String,
    required: [true, "Please enter a service type"],
    validate(value) {
      const acceptedServiceType = [`MOBILE_PREPAID`, `MOBILE_POSTPAID`];

      if (!acceptedServiceType.includes(value))
        throw {
          message: `Service type can only be "MOBILE_PREPAID" or "MOBILE_POSTPAID"`,
          code: 400,
        };
    },
  },
  service_start_date: {
    type: Number,
    required: true,
  },
  msisdn: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please msisdn is required"],
    validate(value) {
      // validate phone and convert to E164 format
      const { isValid, phoneNumber } = phone(value, { country: "" });
      if (!isValid) throw { message: "Please enter valid phone number" };

      return (this.msisdn = phoneNumber);
    },
  },
});

const SubscriberPhone = mongoose.model(
  "Subscriber_Phone",
  subscriberPhoneSchema
);

module.exports = SubscriberPhone;
