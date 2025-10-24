import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser } from '../controllers/UserController'
import { UserData } from "../types";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getUsers(prisma);
        console.log(products);
        res.json(products)
    });

    router.post('/create', async (req, res) => {
        const datos: UserData = req.body;
        const result = await postUser(prisma, datos);
        console.log(result);
        res.json(result)
    });

    return router;
}


export default UserRoute;