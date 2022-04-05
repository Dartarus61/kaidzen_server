import { Sequelize, DataTypes, Model } from "sequelize";
import User from "./user_models.js";
const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
});

class UserToken extends Model {}
UserToken.init(
  {
    refreshToken: { type: DataTypes.STRING(1234), allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    timestamps: false,
  }
);
User.hasOne(UserToken);
UserToken.belongsTo(User);
UserToken.sync();

export default UserToken;
