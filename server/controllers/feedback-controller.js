const { Feedback } = require("../models");

class FeedbackController {
  static async storeUserFeedBack(req, res) {
    try {
      const { attention, name, email, phone, message } = req.body;
      await Feedback.create({ ...{ attention, name, email, phone, message } });
      res
        .status(201)
        .send(
          `We have been get your feed back successfully ! Lenleys - team will touch you soon.`
        );
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = FeedbackController;
