import { Sequelize, DataTypes, Model } from 'sequelize'

class UserModel extends Model {
    static register(sequelize) {
        this.init(
            {
                login: { type: DataTypes.STRING, allowNull: false, unique: true },
                password: { type: DataTypes.STRING, allowNull: false },
                name: { type: DataTypes.STRING, allowNull: false },
                surname: { type: DataTypes.STRING, allowNull: false },
                secondname: { type: DataTypes.STRING, allowNull: false },
                group: { type: DataTypes.STRING, allowNull: false },
                area_of_improvement: { type: DataTypes.STRING, allowNull: true },
                role: { type: DataTypes.STRING, defaultValue: 'user' },
                isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
                acticationLink: { type: DataTypes.STRING, allowNull: true },
            },
            {
                sequelize,
                modelName: 'user',
                timestamps: false,
            }
        )
    }
}

export default UserModel
