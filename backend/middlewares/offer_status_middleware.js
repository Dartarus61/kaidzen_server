import User from "../models/user_models.js";
import Comment from "../models/comment_model.js";
import Offer from "../models/offer_model.js";

export default async function (req, res, next) {
  const AllOfffers = await Offer.findAll({
    include: Comment,
  });
  if (!AllOfffers) next();
  for (let index = 0; index < AllOfffers.length; index++) {
    let parseOffer = JSON.stringify(AllOfffers[index], null, 2);
    const offer = JSON.parse(parseOffer);

    if (offer.accepted == true || offer.accepted == false) continue;

    const count = await User.findAll({
      where: { area_of_improvement: offer.area_of_improvement },
      raw: true,
    });

    if (count.length == offer.Comments.length) {
      if (offer.solution_temp == null)
        AllOfffers[index].update({ accepted: true });
      else AllOfffers[index].update({ accepted: false });
    } else AllOfffers[index].update({ accepted: "На рассмотрении" });
  }
  next();
}
