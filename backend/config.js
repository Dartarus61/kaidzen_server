import dotenv from "dotenv";
dotenv.config({ silent: (process.env.JWT_ACCESS_SECRET = "bigjwtmagic") });
dotenv.config({ silent: (process.env.JWT_REFRESH_SECRET = "itsamagicdude") });
dotenv.config({ silent: (process.env.SMTP_HOST = "smtp.gmail.com") });
dotenv.config({ silent: (process.env.SMTP_USER = "07kirgame@gmail.com") });
dotenv.config({ silent: (process.env.SMTP_PASS = "191kalinina191_190") });
dotenv.config({ silent: (process.env.API_URL = "http://localhost:3001") });
dotenv.config({ silent: (process.env.CLIENT_URL = "http://ya.ru/") });
