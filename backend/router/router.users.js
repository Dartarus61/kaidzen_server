import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import { body } from "express-validator";
import auth_middleware from "../middlewares/auth_middleware.js";

const User_router = new Router();

User_router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  user_controller.registration
);
User_router.post("/login", user_controller.login);
User_router.post("/logout", user_controller.logout);
User_router.post("/users/changerole", user_controller.ChangeRole);
User_router.get("/activate/:link", user_controller.activation);
User_router.get("/refresh", user_controller.refresh);
User_router.get("/users", /*auth_middleware,*/ user_controller.getUser);
User_router.post("/resetpass", user_controller.resetPass);
export { User_router };
