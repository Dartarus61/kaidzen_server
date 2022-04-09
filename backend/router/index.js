import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import { body } from "express-validator";
import auth_middleware from "../middlewares/auth_middleware.js";

const router = new Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  user_controller.registration
);
router.post("/login", user_controller.login);
router.post("/logout", user_controller.logout);
router.get("/activate/:link", user_controller.activation);
router.get("/refresh", user_controller.refresh);
router.get("/users", auth_middleware, user_controller.getUser);
router.get("/offer", user_controller.sendOffer);// send offer from user to db
router.get("/offer/myof", user_controller.getmyoffer); // вывод оферов юзера
router.get("/offer/masters", user_controller.staffOffers); // output all offers from group of CEO
router.get("/offer/master/setcom", user_controller.setCom); // set comment to users post

export { router };
