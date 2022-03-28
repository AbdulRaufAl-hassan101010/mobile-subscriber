const router = require("express").Router();
const {
  createOwner,
  getOwners,
  getOwnerById,
  updateOwner,
  deleteOwner,
} = require("../controllers/owner");

// add owner phone number route
router.post("/api/owners", createOwner);

// get all owners phone number route
router.get("/api/owners", getOwners);

// get owner phone number by id route
router.get("/api/owners/:id", getOwnerById);

// update owner phone route
router.patch("/api/owners/:id", updateOwner);

// delete owner phone route
router.delete("/api/owners/:id", deleteOwner);

module.exports = router;
