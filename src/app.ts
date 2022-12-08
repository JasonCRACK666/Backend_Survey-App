import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import config from './config'

import authRoutes from './user/infrastructure/route/authRoute'
import userRoutes from './user/infrastructure/route/userRoute'
import accountRoutes from './account/infrastructure/route/accountRoute'
import surveyRoutes from './survey/infrastructure/route/surveyRoute'

const app = express()

app.set('PORT', config.SERVER_PORT)

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/surveys', surveyRoutes)

export default app
