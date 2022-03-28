const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

// add user phone number route
router.post("/api/users", createUser);

// get all users phone number route
router.get("/api/users", getUsers);

// get user phone number by id route
router.get("/api/users/:id", getUserById);

// update user phone route
router.patch("/api/users/:id", updateUser);

// delete user phone route
router.delete("/api/users/:id", deleteUser);

module.exports = router;
