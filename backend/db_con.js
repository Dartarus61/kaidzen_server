import { Sequelize } from 'sequelize'
import CommentModel from './models/comment_model.js'
import OfferModel from './models/offer_model.js'
import UserModel from './models/user_model.js'
import TokenModel from './models/token_model.js'

export async function db_connect() {
    console.log(process.env.DATABASE_URL)
    const sequelize = process.env.DATABASE_URL
        ? new Sequelize(process.env.DATABASE_URL, {
              dialect: 'postgres',
              ssl: true,
              dialectOptions: {
                  ssl: true,
              },
          })
        : new Sequelize(
              process.env.DB_NAME || 'postgres',
              process.env.DB_USER || 'postgres',
              process.env.DB_PASSWORD || 'postgres',
              {
                  host: process.env.DB_HOST || 'localhost',
                  port: process.env.DB_PORT || '5432',
                  dialect: 'postgres',
                  freezeTableName: true,
              }
          )
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
        const models = [CommentModel, OfferModel, UserModel, TokenModel]

        for (const model of models) {
            model.register(sequelize)
        }

        UserModel.hasOne(TokenModel)
        TokenModel.belongsTo(UserModel)

        OfferModel.hasMany(CommentModel)
        CommentModel.belongsTo(OfferModel)

        UserModel.hasMany(OfferModel)
        OfferModel.belongsTo(UserModel)
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}
