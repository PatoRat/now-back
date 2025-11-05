import { PrismaClient } from '@prisma/client'
import express from 'express'
import addRoutes from './routes'
import { port, BACK_URL } from '../config'

const prisma = new PrismaClient()

const app = express();

app.use(express.json())

addRoutes(app, prisma)

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at: ${BACK_URL}`),
)
