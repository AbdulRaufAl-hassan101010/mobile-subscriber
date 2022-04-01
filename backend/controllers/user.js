const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = new User({ ...req.body, _id: Date.now() });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) error.code = 400;

    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("owner");

    res.status(200).json(users);
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("phone")
      .populate("owner");

    if (!user) throw { code: 404, message: "User not found" };

    res.status(200).json({ user, phone: user.phone });
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("phone");

    if (!user) throw { code: 404, message: "User not found" };

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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) throw { code: 404, message: "User not found" };

    await user.remove();

    res.status(200).json({});
  } catch (error) {
    res.status(error.code || 400).json({
      error: { message: error.message || error, code: res.statusCode },
    });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
