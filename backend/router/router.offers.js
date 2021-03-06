import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import { body } from "express-validator";
import offers_controller from "../controllers/offers_controller.js";
import auth_middleware from "../middlewares/auth_middleware.js";
import offer_status_middleware from "../middlewares/offer_status_middleware.js";
import { upload } from "../upload.js";
import multer from "multer";

const Offer_router = new Router();

Offer_router.post(
  "/offer",
  multer({ storage: upload }).single("filedata"),
  offers_controller.sendOffer
); // send offer from user to db
Offer_router.get("/download", offers_controller.FileDownload);
Offer_router.post(
  "/offer/myof",
  offer_status_middleware,
  offers_controller.getmyoffer
); // вывод оферов юзера
Offer_router.post(
  "/offer/masters",
  offer_status_middleware,
  offers_controller.staffOffers
); // output all offers from group of CEO
Offer_router.post(
  "/offer/masters/false",
  offer_status_middleware,
  offers_controller.staffOffersFalse
); // output all false offers from group of CEO
Offer_router.post(
  "/offer/master/setcom",
  offer_status_middleware,
  offers_controller.setCom
); // set comment to users post
Offer_router.post(
  "/offer/master/setcomtrue",
  offer_status_middleware,
  offers_controller.setTrueCom
); // set comment to users post
Offer_router.get("/allposts", offer_status_middleware, offers_controller.posts);

export { Offer_router };
