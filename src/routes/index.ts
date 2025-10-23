import { type PrismaClient } from "@prisma/client"
import EventRoute from "./event.route"
import UserRoute from "./user.route"
import ImagenRoute from "./image.route"
import { type Express } from "express"

const addRoutes = (app: Express, prisma: PrismaClient) => {
    app.use('/events/', EventRoute(prisma));
    app.use('/users/', EventRoute(prisma));
    app.use('/images/', EventRoute(prisma));
}

export default addRoutes