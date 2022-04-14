import UserModel from '../models/user_model.js'
import CommentModel from '../models/comment_model.js'
import OfferModel from '../models/offer_model.js'

export default async function (req, res, next) {
    const AllOfffers = await OfferModel.findAll({
        include: CommentModel,
    })
    if (!AllOfffers) next()
    for (let index = 0; index < AllOfffers.length; index++) {
        let parseOffer = JSON.stringify(AllOfffers[index], null, 2)
        const offer = JSON.parse(parseOffer)

        if (offer.accepted == true || offer.accepted == false) continue

        const count = await UserModel.findAll({
            where: { area_of_improvement: offer.area_of_improvement },
            raw: true,
        })

        if (count.length == offer.Comments.length) {
            if (offer.solution_temp == null) AllOfffers[index].update({ accepted: true })
            else AllOfffers[index].update({ accepted: false })
        } else AllOfffers[index].update({ accepted: 'На рассмотрении' })
    }
    next()
}
