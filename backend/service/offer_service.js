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
}
Offer.sync({ force: true });
export default new OfferService();
