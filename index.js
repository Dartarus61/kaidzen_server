import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { db_connect } from './backend/db_con.js'
import { User_router } from './backend/router/router.users.js'
import errorMiddleware from './backend/middlewares/error_midleware.js'
import { Offer_router } from './backend/router/router.offers.js'
import path from 'path'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', User_router)
app.use('/api', Offer_router)
app.use(errorMiddleware)

console.log(process.env)

const start = async () => {
    try {
        app.listen(process.env.PORT || 3001, () => {
            console.log(`server started on ${process.env.PORT || 3001}`)
        })
        await db_connect()
    } catch (error) {
        console.log(error)
    }
}

start()
