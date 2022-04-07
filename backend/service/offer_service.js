import User from "../models/user_models.js";
import Offer from "../models/offder_model.js";
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
    const user = await Offer.findAll({ where: { UserId: id }, raw: true });
    return user;
  }
  async myGroupOffers(group) {
    const users = await User.findAll({ where: { group: group }, raw: true });
    /*  let offers = users.map(async (obj) => {
      let userOffer = await Offer.findAll({
        where: { UserId: obj.id },
        raw: true,
      });
      offers += userOffer;
    });
    */
    let OfferArr = [];
    for (let index = 0; index < users.length; index++) {
      let userOffer = await Offer.findAll({
        where: { UserId: users[index].id },
        raw: true,
      });
      if (!userOffer.length) continue;
      // console.log(userOffer);
      for (let index = 0; index < userOffer.length; index++) {
        OfferArr.push(userOffer[index]);
      }
    }
    console.log(OfferArr);
  }
}
export default new OfferService();
