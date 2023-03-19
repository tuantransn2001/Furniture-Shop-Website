const express = require("express");
const feedBackRouter = express.Router();
const FeedbackController = require("../controllers/feedback-controller");
feedBackRouter.post("/", FeedbackController.storeUserFeedBack);

module.exports = { feedBackRouter };
