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
      descrition: data.descrition,
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
    console.log(typeof user);
    const k = Offer.build(user, { include: Comment });
    ///console.log(user);
    let test = JSON.stringify(user[0], null, 2);
    console.log(JSON.parse(test));
    // console.log(user);
    //console.log(JSON.stringify(user, null, 2));
    /* for (let index = 0; index < test.length; index++) {
      if (!test[index].Comments.length) continue;
      for (let j = 0; j < test[index].Comments.length; index++) {
        let boss = User.findOne({
          where: { id: test[index].Comments[j].UserId },
          raw: true,
        });
        test[index].Comments[j].Name = boss.name + " " + boss.surname;
        console.log(j);
      }
      console.log(test);
    } */
    return JSON.parse(test);
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
      //console.log(userOffer);
      for (let index = 0; index < userOffer.length; index++) {
        OfferArr.push(userOffer[index]);
      }
    }
    return OfferArr;
  }
  async setComment(data) {
    const newComment = await Offer.findOne({ where: { id: data.id } });
    await newComment.createComment({
      descrition: data.ctx,
      UserId: data.userId,
    });
    return "successful";
  }
}
export default new OfferService();
