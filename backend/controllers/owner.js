const Owner = require("../models/Owner");

const createOwner = async (req, res) => {
  try {
    const user = new Owner({ ...req.body, _id: Date.now() });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) error.code = 400;

    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const getOwners = async (req, res) => {
  try {
    const users = await Owner.find({});

    res.status(200).json(users);
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const getOwnerById = async (req, res) => {
  try {
    const user = await Owner.findById(req.params.id).populate("phone");

    if (!user) throw { code: 404, message: "Owner not found" };

    res.status(200).json({ user, phone: user.phone });
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const updateOwner = async (req, res) => {
  try {
    const user = await Owner.findById(req.params.id).populate("phone");

    if (!user) throw { code: 404, message: "Owner not found" };

    const updatekeys = Object.keys(req.body);

    updatekeys.forEach((key) => {
      if (key === "_id") throw { code: 400, message: "You can't edit the id" };

      user[key] = req.body[key];
    });

    await user.save();

    res.status(200).json({ user, phone: user.phone });
  } catch (error) {
    if (error.code === 11000) error.code = 400;

    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Owner.findById(id);

    if (!user) throw { code: 404, message: "Owner not found" };

    await user.remove();

    res.status(200).json({});
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

module.exports = {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner,
};
