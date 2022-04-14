import { Sequelize, DataTypes, Model } from 'sequelize'

class OfferModel extends Model {
    static register(sequelize) {
        this.init(
            {
                description: { type: DataTypes.STRING, allowNull: false },
                economic: { type: DataTypes.STRING, allowNull: false },
                area_of_improvement: { type: DataTypes.STRING, allowNull: false },
                accepted: { type: DataTypes.STRING, defaultValue: null, allowNull: true },
                solution_temp: { type: DataTypes.BOOLEAN, defaultValue: null },
                filePath: { type: DataTypes.STRING, allowNull: true },
                fileName: { type: DataTypes.STRING, allowNull: true },
            },
            {
                sequelize,
                timestamps: true,
                modelName: 'offer',
                updatedAt: false,
            }
        )
    }
}

export default OfferModel
