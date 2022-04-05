import { Sequelize } from "sequelize";
export async function db_connect() {
  const sequelize = new Sequelize("postgres", "postgres", "postgres", {
    host: process.env.DB_HOST || "localhost",
    port: "5432",
    dialect: "postgres",
    freezeTableName: true,
  });
  try {
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
}
