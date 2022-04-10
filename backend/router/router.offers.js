import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import { body } from "express-validator";
import offers_controller from "../controllers/offers_controller.js";
import auth_middleware from "../middlewares/auth_middleware.js";

const Offer_router = new Router();

Offer_router.post("/offer", offers_controller.sendOffer); // send offer from user to db
Offer_router.post("/offer/myof", offers_controller.getmyoffer); // вывод оферов юзера
Offer_router.post("/offer/masters", offers_controller.staffOffers); // output all offers from group of CEO
//router.post("/offer/masters/false", offers_controller.staffOffers); // output all false offers from group of CEO
Offer_router.post("/offer/master/setcom", offers_controller.setCom); // set comment to users post

export { Offer_router };
