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
    const users = await User.findAll({ where: { group: group }, raw: true });
    let OfferArr = [];
    for (let index = 0; index < users.length; index++) {
      let userOffer = await Offer.findAll({
        where: { UserId: users[index].id },
        raw: true,
      });
      if (!userOffer.length) continue;
      for (let index = 0; index < userOffer.length; index++) {
        OfferArr.push(userOffer[index]);
      }
    }
    return OfferArr;
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
