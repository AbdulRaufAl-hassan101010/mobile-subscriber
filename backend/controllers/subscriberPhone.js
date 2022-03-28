const { update } = require("../models/SubscriberPhone");
const SubscriberPhone = require("../models/SubscriberPhone");

// add a subcriber phone
const createSubscriberPhone = async (req, res) => {
  try {
    const subscriberPhone = new SubscriberPhone({
      ...req.body,
      _id: Date.now(),
      service_start_date: Date.now(),
    });

    // save to db
    await subscriberPhone.save();

    res.status(201).json(subscriberPhone);
  } catch (error) {
    // duplicate error handler
    if (error.code === 11000) {
      error.code = 400;
    }

    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

// get all subscribers phone
const getSubscriberPhones = async (req, res) => {
  try {
    let subscriberPhones = [];

    subscriberPhones = await SubscriberPhone.find({})
      .populate("customer_id_owner")
      .populate("customer_id_user")
      .exec();

    // filter out service type
    if (req.query.service_type) {
      subscriberPhones = await SubscriberPhone.find({})
        .where("service_type")
        .equals(req.query.service_type.toUpperCase())
        .populate("customer_id_owner")
        .populate("customer_id_user")
        .exec();
    }

    // sort
    if (req.query.sortBy) {
      const queryString = req.query.sortBy.split(":");
      const field = queryString[0];

      subscriberPhones = await SubscriberPhone.find({})
        .sort({ [field]: queryString[1] !== "asc" ? -1 : 1 })
        .populate("customer_id_owner")
        .populate("customer_id_user")
        .exec();
    }

    // search by phone
    if (req.query.search) {
      const queryString = req.query.search;

      subscriberPhones = await SubscriberPhone.find({
        msisdn: { $regex: queryString, $options: "i" },
      })
        .populate("customer_id_owner")
        .populate("customer_id_user")
        .exec();
    }

    res.status(200).json({ subscriberPhones, count: subscriberPhones.length });
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

//get subcriber phone by id
const getSubscriberPhoneById = async (req, res) => {
  try {
    // get id fron URL
    const { id } = req.params;

    const subscriberPhone = await SubscriberPhone.findById(id)
      .populate("customer_id_user")
      .exec();

    if (!subscriberPhone)
      throw { code: 404, message: "Phone number does not exist" };

    res.status(200).json(subscriberPhone);
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

// update subscriber phone
const updateSubcriberPhone = async (req, res) => {
  try {
    // get id fron URL
    const { id } = req.params;

    // if id doesn't exist throw error
    if (!id) throw { code: 400, message: "id is required" };

    const subscriberPhone = await SubscriberPhone.findOne({ id });

    if (!subscriberPhone)
      throw { code: 404, message: "Phone number does not exist" };

    // get request body keys to update fields
    const updateKeys = Object.keys(req.body);

    updateKeys.forEach((key) => {
      if (key === "id") return;

      subscriberPhone[key] = req.body[key];
    });

    await subscriberPhone.save();

    res.status(200).json(subscriberPhone);
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

// delete subcriber phone
const deleteSubcriberPhone = async (req, res) => {
  try {
    // get id fron URL
    const { id } = req.params;

    const subscriberPhone = await SubscriberPhone.findById(id);

    if (!subscriberPhone)
      throw { code: 404, message: "Phone number does not exist" };

    await subscriberPhone.remove();

    res.status(200).json({});
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

module.exports = {
  createSubscriberPhone,
  getSubscriberPhones,
  getSubscriberPhoneById,
  updateSubcriberPhone,
  deleteSubcriberPhone,
};
