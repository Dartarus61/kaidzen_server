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
    area_of_improvement: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    acticationLink: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize, // Экземпляр подключения (обязательно)
    timestamps: false,
  }
);

<<<<<<< HEAD
=======
User.sync();
>>>>>>> 7fc875997a97fd0906dc5c0bcf62a22956e95b12
export default User;
