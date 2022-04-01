const router = require("express").Router();
const {
  createSubscriberPhone,
  getSubscriberPhones,
  getSubscriberPhoneById,
  updateSubcriberPhone,
  deleteSubcriberPhone,
} = require("../controllers/subscriberPhone");

// add subscriber phone number route
router.post("/api/phones", createSubscriberPhone);
// get all subscriber phone number route
router.get("/api/phones", getSubscriberPhones);
// get subscriber phone number by id route
router.get("/api/phones/:id", getSubscriberPhoneById);
// update subcriber phone route
router.patch("/api/phones/:id", updateSubcriberPhone);
// delete subcriber phone route
router.delete("/api/phones/:id", deleteSubcriberPhone);

module.exports = router;
