import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getEvents, getEventsFiltered, postEvent } from '../controllers/EventController'
import { EventData } from "../../scripts/types";

const jwt = require("jsonwebtoken");
// Esta es la clave cifrada para el JWT de la app Now
const SECRET_KEY_JWT = "ek1vrqfharXDqye/f3SfAPH6/jUUBVIBN1xVIH6ho8OkuhDveU2HVGxYdH25EK/T8KTLBnPE3KQvCJlgkIA1dw=";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/all', async (req, res) => {
        const events = await getEvents(prisma);
        console.log(events);
        res.json(events)
    });

    router.get('/', async (req, res) => {
        const events = await getEventsFiltered(prisma);
        console.log(events);
        res.json(events)
    });

    router.post('/create', async (req, res) => {
        const datos: EventData = req.body;
        const decoded = jwt.verify(datos.token, SECRET_KEY_JWT);
        const result = await postEvent(prisma, datos, decoded.id);
        console.log(result);
        res.json(result)
    });

    return router;
}


export default UserRoute;