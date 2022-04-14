import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { db_connect } from './backend/db_con.js'
import { User_router } from './backend/router/router.users.js'
import errorMiddleware from './backend/middlewares/error_midleware.js'
import { Offer_router } from './backend/router/router.offers.js'
import path from 'path'

if (process.env.NODE_ENV == 'PROD') {
    dotenv.config({ path: path.resolve('.prod.env') })
} else dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', User_router)
app.use('/api', Offer_router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await db_connect()
        app.listen(3001, () => {
            console.log(`server started on ${3001}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
