import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getEvents, postEvent } from '../controllers/EventController'
import { EventData } from "../types";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/all', async (req, res) => {
        const products = await getEvents(prisma);
        console.log(products);
        res.json(products)
    });

    // router.get('/', async (req, res) => {
    //     const products = await getEvents(prisma);
    //     console.log(products);
    //     res.json(products)
    // }); // acá iría la logica de filtrado

    router.post('/create', async (req, res) => {
        const datos: EventData = req.body;
        const result = await postEvent(prisma, datos);
        console.log(result);
        res.json(result)
    });

    return router;
}


export default UserRoute;