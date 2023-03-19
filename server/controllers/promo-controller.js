const { Promo } = require("../models");

class PromoControllers {
  static async getAllPromo(req, res) {
    try {
      const promoList = await Promo.findAll();
      res.status(200).send(promoList);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  static async validatePromo(req, res) {
    const { code } = req.params;

    const foundPromo = await Promo.findOne({
      where: {
        promo_code: code,
      },
    });

    if (foundPromo) {
      res.status(201).send({
        status: "success",
        message: "Your promo have been validated successfully!",
      });
    } else {
      res.status(404).send({
        status: "Not found",
        message:
          "Your promo haven't been validated fail.The Promo does not exist.Please check it and try again!",
      });
    }
  }
}

module.exports = PromoControllers;
