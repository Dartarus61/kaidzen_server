import userService from "../service/user_service.js";
import { validationResult } from "express-validator";
import ApiError from "../exception/api_error.js";
import offer_service from "../service/offer_service.js";

class OfferController {
  async sendOffer(req, res, next) {
    // я получаю след поля: description, economic, area_of_improvement, id of user
    try {
      const data = req.body;
      const userData = await offer_service.UserSendOffer(data);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async getmyoffer(req, res, next) {
    //я получаю id юзера
    try {
      const data = req.body;
      const userData = await offer_service.UserGetOffers(data.id);
      res.send(userData);
    } catch (error) {
      next(error);
    }
  }
  async staffOffers(req, res, next) {
    try {
      const data = req.body; // id group
      const userData = await offer_service.myGroupOffers(data.area);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async staffOffersFalse(req, res, next) {
    try {
      const data = req.body;
      const userData = await offer_service.resolveOffers(data);
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async setCom(req, res, next) {
    try {
      const data = req.body; //{id - post id, ctx - messsage, userId - id of author}
      const myreq = await offer_service.setComment(data);
      res.json(myreq);
    } catch (error) {
      next(error);
    }
  }
  async setTrueCom(req, res, next) {
    try {
      const data = req.body; //{id - post id, ctx - messsage, userId - id of author}
      const myreq = await offer_service.ItsTrueCom(data);
      res.json(myreq);
    } catch (error) {
      next(error);
    }
  }
}
export default new OfferController();
