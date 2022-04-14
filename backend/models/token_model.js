import { Sequelize, DataTypes, Model } from 'sequelize'

class TokenModel extends Model {
    static register(sequelize) {
        this.init(
            {
                refreshToken: { type: DataTypes.STRING(1234), allowNull: false },
            },
            {
                sequelize,
                modelName: 'token',
                timestamps: false,
            }
        )
    }
}

export default TokenModel
