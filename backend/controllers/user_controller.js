import userService from "../service/user_service.js";
import { validationResult } from "express-validator";
import ApiError from "../exception/api_error.js";
import offer_service from "../service/offer_service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const { login, password, name, surname, secondname, group } = req.body;
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
      const { login, password } = req.body;
      const userData = await userService.login(login, password);
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
  async ChangeRole(req, res, next) {
    try {
      const new_UserData = req.body;
      const output = await userService.ChangeRoleUser(new_UserData);
      res.json(output);
    } catch (error) {
      next(error);
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
  async resetPass(req, res, next) {
    try {
      const userData = req.body;
      const output = await userService.ResetPass(userData);
      res.json(output);
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
