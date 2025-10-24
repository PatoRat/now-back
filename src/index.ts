import { PrismaClient } from '@prisma/client'
import express from 'express'
import addRoutes from './routes'

const prisma = new PrismaClient()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

addRoutes(app, prisma)

const server = app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`),
)
