import { Sequelize, DataTypes, Model } from "sequelize";
import User from "./user_models.js";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
});

class Offer extends Model {}
Offer.init(
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
    sequelize, // Экземпляр подключения (обязательно)
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(Offer);
Offer.belongsTo(User);

export default Offer;
