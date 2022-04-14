import { Sequelize, DataTypes, Model } from 'sequelize'

class CommentModel extends Model {
    static register(sequelize) {
        this.init(
            {
                description: { type: DataTypes.STRING, allowNull: true },
                UserId: { type: DataTypes.INTEGER, allowNull: false },
            },
            {
                sequelize,
                modelName: 'comment',
                timestamps: false,
            }
        )
    }
}

export default CommentModel
