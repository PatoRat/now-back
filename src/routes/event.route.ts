import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getEvents, getEventsFiltered, getMyEvents, getUbicacionFromEvent, postEvent } from '../controllers/EventController'
import { EventData } from "../../scripts/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";


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

    router.get('/my-events', async(req, res)=>{
        const {token} = req.body;
        const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
        const result = await getMyEvents(prisma, decoded.id);
        console.log(result);
        res.json(result);
        
    });

    // router.get('/favs', async(req, res)=>{
    //     const {token} = req.body;
    //     const decoded = jwt.verify(token, SECRET_KEY_JWT);
    //     const result = await getMyEvents(prisma, decoded.id);
    //     console.log(result);
    //     res.json(result);
        
    // }); // Ver ya que tiene logica mucho mas compleja

    router.get('/ubicacion/:eventId', async (req, res) => {
        const { eventId } = req.params;
        try {
            const result = await getUbicacionFromEvent(prisma, Number(eventId));
            console.log(result);
            res.json(result);
        } catch (error) {
            console.error("No encontró esa id.", error);
            res.status(401).json(error);
        }
    });

    router.post('/create', async (req, res) => {
        const datos: EventData = req.body;
        const decoded = jwt.verify(datos.token, SECRET_KEY_JWT) as JwtPayload;
        const result = await postEvent(prisma, datos, decoded.id);
        if (!result) {
            const error = "El usuario no existe";
            console.error(error);
            return res.status(401).json({ error: error });
        }
        console.log(result);
        res.json(result);
    });

    return router;
}

export default UserRoute;