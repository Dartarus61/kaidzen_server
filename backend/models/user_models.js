import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  dialect: "postgres",
});

class User extends Model {}
User.init(
  {
    login: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    secondname: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING, allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    acticationLink: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    timestamps: false,
  }
);
User.sync({ alter: true });
export default User;
