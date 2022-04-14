import dotenv from "dotenv";
dotenv.config({ silent: (process.env.JWT_ACCESS_SECRET = "bigjwtmagic") });
dotenv.config({ silent: (process.env.JWT_REFRESH_SECRET = "itsamagicdude") });
dotenv.config({ silent: (process.env.SMTP_HOST = "smtp.gmail.com") });
dotenv.config({ silent: (process.env.SMTP_USER = "07kirgame@gmail.com") });
dotenv.config({ silent: (process.env.SMTP_PASS = "191kalinina191_190") });
dotenv.config({ silent: (process.env.API_URL = "http://localhost:3001") });
dotenv.config({ silent: (process.env.CLIENT_URL = "http://ya.ru/") });
dotenv.config({
  silent: (process.env.DB_MAIN =
    "postgres://pwfltltmagljbh:7a6d15a895c0c0d40c3bc02ee73077dc1043e9d7bd6a1ebd7b61b2864f8799ad@ec2-34-192-210-139.compute-1.amazonaws.com:5432/df7c675ja6oaqm"),
});
