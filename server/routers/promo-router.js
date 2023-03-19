const express = require("express");
const promoRouter = express.Router();
const PromoControllers = require("../controllers/promo-controller");
promoRouter.get("/", PromoControllers.getAllPromo);
promoRouter.get("/validate/:code", PromoControllers.validatePromo);
module.exports = { promoRouter };
