import { Sequelize, DataTypes, Model } from "sequelize";
import Offer from "./offer_model.js";

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
});

class Comment extends Model {}
Comment.init(
  {
    description: { type: DataTypes.STRING, allowNull: true },
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    timestamps: false,
  }
);

Offer.hasMany(Comment);
Comment.belongsTo(Offer);

export default Comment;
