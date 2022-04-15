import UserModel from '../models/user_model.js'
import CommentModel from '../models/comment_model.js'
import OfferModel from '../models/offer_model.js'
import path from 'path'
import { Op, where } from 'sequelize'
import ApiError from '../exception/api_error.js'

async function Offerconstruct(OfferArr) {
    let AreaOffers = []
    for (let index = 0; index < OfferArr.length; index++) {
        let ParseOffer = JSON.stringify(OfferArr[index], null, 2)
        AreaOffers.push(JSON.parse(ParseOffer))

        let user = await UserModel.findOne({
            where: { id: AreaOffers[index].userId },
            raw: true,
        })

        AreaOffers[index].Author = user.name + ' ' + user.surname + ' ' + user.secondname
        AreaOffers[index].Group = user.group
        if (!AreaOffers[index].Comments) continue

        for (let j = 0; j < AreaOffers[index].Comments.length; j++) {
            let boss = await UserModel.findOne({
                where: { id: AreaOffers[index].Comments[j].userId },
                raw: true,
            })

            AreaOffers[index].Comments[j].Name = boss.name + ' ' + boss.surname + ' ' + boss.secondname
        }
    }

    AreaOffers.sort((a, b) => a.id - b.id)
    return AreaOffers
}
class OfferService {
    async UserSendOffer(data, filedata) {
        const user = await UserModel.findOne({
            where: {
                id: data.id,
            },
        })
        if (filedata) {
            let mypath = path.resolve(filedata.path)
            console.log(mypath)
            console.log(filedata.path)
            await user.createOffer({
                description: data.description,
                economic: data.economic,
                area_of_improvement: data.area_of_improvement,
                filePath: mypath,
                fileName: filedata.originalname,
            })
        } else
            await user.createOffer({
                description: data.description,
                economic: data.economic,
                area_of_improvement: data.area_of_improvement,
            })
        return 'successful'
    }
    async UserGetOffers(id) {
        const user = await OfferModel.findAll({
            where: { userId: id },
            include: CommentModel,
        })
        if (!user) return 0
        let myoffers = []
        for (let index = 0; index < user.length; index++) {
            let parsejson = JSON.stringify(user[index], null, 2)
            myoffers.push(JSON.parse(parsejson))

            if (!myoffers[index].Comments) continue

            for (let j = 0; j < myoffers[index].Comments.length; j++) {
                let boss = await UserModel.findOne({
                    where: { id: myoffers[index].Comments[j].userId },
                    raw: true,
                })

                myoffers[index].Comments[j].Name = boss.name + ' ' + boss.surname + ' ' + boss.secondname
            }
        }
        myoffers.sort((a, b) => a.id - b.id)
        return myoffers
    }
    async myGroupOffers(data) {
        const OfferArr = await OfferModel.findAll({
            where: {
                area_of_improvement: data.area,
                [Op.or]: [{ accepted: 'На рассмотрении' }, { accepted: null }],
            },
            include: CommentModel,
        })
        let finalMas = []
        let MastersOffers = await Offerconstruct(OfferArr)
        for (let index = 0; index < MastersOffers.length; index++) {
            if (!MastersOffers[index].Comments) {
                finalMas.push(MastersOffers[index])
                continue
            }
            for (let j = 0; j < MastersOffers[index].Comments.length; j++) {
                if (MastersOffers[index].Comments[j].userId == data.id) continue
                else {
                    finalMas.push(MastersOffers[index])
                    break
                }
            }
        }
        return finalMas
    }
    async resolveOffers(data) {
        const offers = await OfferModel.findAll({
            where: {
                area_of_improvement: data.area,
                [Op.or]: [{ accepted: 'true' }, { accepted: 'false' }],
            },
            include: CommentModel,
        })
        return await Offerconstruct(offers)
    }
    async setComment(data) {
        const newComment = await OfferModel.findOne({ where: { id: data.id } })
        await newComment.createComment({
            description: data.ctx,
            userId: data.UserId,
        })
        newComment.update({ solution_temp: false })
        return 'successful denied'
    }
    async ItsTrueCom(data) {
        const newComment = await OfferModel.findOne({ where: { id: data.id } })
        await newComment.createComment({
            description: data.ctx,
            userId: data.UserId,
        })
        return 'successful true'
    }
    async download(data) {
        const file = await OfferModel.findOne({ where: { id: data.id } })
        let output = JSON.parse(JSON.stringify(file, null, 2))
        const name = output.fileName
        return [output.filePath, output.fileName]
    }
    async getalloffers() {
        const offers = await OfferModel.findAll()
        return await Offerconstruct(offers)
    }
}
export default new OfferService()
