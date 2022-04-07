import userService from "../service/user_service.js";
import { validationResult } from "express-validator";
import ApiError from "../exception/api_error.js";
import offer_service from "../service/offer_service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password, name, surname, secondname, group } = req.body;
      const userData = await userService.registration(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async getUser(req, res, next) {
    try {
      const user = await userService.getAllUsers();
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async activation(req, res, next) {
    try {
      const acticationLink = req.params.link;
      await userService.activate(acticationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async sendOffer(req, res, next) {
    try {
      const data = req.body;
      const userData = await offer_service.UserSendOffer(data);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getmyoffer(req, res, next) {
    try {
      const data = req.body;
      const userData = await offer_service.UserGetOffers(data.id);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async staffOffers(req, res, next) {
    try {
      const data = req.body;
      const userData = await offer_service.myGroupOffers(data.group);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
