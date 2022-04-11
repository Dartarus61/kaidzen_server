import User from "../models/user_models.js";
import Comment from "../models/comment_model.js";
import Offer from "../models/offer_model.js";

import ApiError from "../exception/api_error.js";

class OfferService {
  async UserSendOffer(data) {
    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    await user.createOffer({
      description: data.description,
      economic: data.economic,
      area_of_improvement: data.area_of_improvement,
    });
    return "successful";
  }
  async UserGetOffers(id) {
    const user = await Offer.findAll({
      where: { UserId: id },
      include: Comment,
    });
    let myoffers = [];
    for (let index = 0; index < user.length; index++) {
      let parsejson = JSON.stringify(user[index], null, 2);
      myoffers.push(JSON.parse(parsejson));

      if (!myoffers[index].Comments.length) continue;

      for (let j = 0; j < myoffers[index].Comments.length; j++) {
        let boss = await User.findOne({
          where: { id: myoffers[index].Comments[j].UserId },
          raw: true,
        });

        myoffers[index].Comments[j].Name = boss.name + " " + boss.surname;
      }
    }
    return myoffers;
  }
  async myGroupOffers(group) {
    const OfferArr = await Offer.findAll({
      where: { area_of_improvement: group },
      include: Comment,
    });
    let AreaOffers = [];
    for (let index = 0; index < OfferArr.length; index++) {
      let ParseOffer = JSON.stringify(OfferArr[index], null, 2);
      AreaOffers.push(JSON.parse(ParseOffer));

      let user = await User.findOne({
        where: { id: OfferArr[index].UserId },
        raw: true,
      });

      AreaOffers[index].Author = user.name + " " + user.surname;
      AreaOffers[index].Group = user.group;

      if (!AreaOffers[index].Comments.length) continue;

      for (let j = 0; j < AreaOffers[index].Comments.length; j++) {
        let boss = await User.findOne({
          where: { id: AreaOffers[index].Comments[j].UserId },
          raw: true,
        });

        myoffers[index].Comments[j].Name = boss.name + " " + boss.surname;
      }
    }
    return AreaOffers;
  }
  async setComment(data) {
    const newComment = await Offer.findOne({ where: { id: data.id } });
    await newComment.createComment({
      description: data.ctx,
      UserId: data.userId,
    });
    return "successful";
  }
}
export default new OfferService();
