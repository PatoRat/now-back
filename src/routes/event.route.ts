import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getEvents, getEventsFiltered, getMyEvents, getUbicacionFromEvent, postEvent, getFavsFromUser } from '../controllers/EventController'
import { EventData } from "../../scripts/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";


const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/all', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const events = await getEvents(prisma);

            console.log("Response /all:", events);
            res.status(200).json(events)

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }

    });

    // ACA FILTRAMOS LOS FAVS

    router.get('/favs', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";
        
        try {
            console.log('BACK//////////////////////////////////');
            // Decodificamos el JWT para obtener el userId
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            // Obtenemos los favoritos del usuario
            const favEvents = await getFavsFromUser(prisma, userId);

            console.log(`Response /favs para usuario ${userId}:`, favEvents);
            res.status(200).json(favEvents);

        } catch (error) {
            console.error("Acceso no autorizado a /favs", error);
            return res.status(401).json({ error: "Acceso no autorizado" });
        }
    });
        // PARAAAA AGREGAR A FAVORITOS
    router.post('/add-fav', async (req, res) => {
        const token = req.headers?.authorization?.split(" ")[1] || "";
        const { eventId } = req.body;

        try {
            if (!token) throw new Error("No hay token");

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            // Agregar relación fan/fav
            const updatedEvent = await prisma.event.update({
                where: { id: Number(eventId) },
                data: {
                    fans: {
                        connect: { id: userId } // agrega el usuario como fan
                    }
                },
                include: { fans: true }
            });

            // Agregar el evento a favs del usuario (opcional, Prisma lo hace automáticamente en relación many-to-many)
            // const updatedUser = await prisma.user.update({
            //     where: { id: userId },
            //     data: {
            //         favs: {
            //             connect: { id: Number(eventId) } 
            //         }
            //     },
            //     include: { favs: true }
            // });

            res.status(200).json({ event: updatedEvent/* , user: updatedUser */ });

        } catch (error) {
            console.error("Error agregando favorito:", error);
            res.status(400).json({ error: "No se pudo agregar a favoritos" });
        }
    });



    router.post('/', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const { coordenadasUsuario } = req.body;

            const events = await getEventsFiltered(prisma, coordenadasUsuario);

            console.log("Response /:", events);
            res.status(200).json(events);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    router.get('/created-by-authorized-user', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const result = await getMyEvents(prisma, decoded.id);// aprovecho que firmo el id
            console.log("Response /created-by-authorized-user:", result);
            res.status(201).json(result);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    router.get('/ubicacion/:eventId', async (req, res) => {
        const { eventId } = req.params;

        try {
            const result = await getUbicacionFromEvent(prisma, Number(eventId));
            console.log(`Response /ubicacion/${eventId}`, result);
            res.status(200).json(result);

        } catch (error) {
            console.error("No encontró esa id.", error);
            res.status(404).json(error);
        }
    });

    router.post('/create-my-event', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const datos: EventData = req.body;

            const result = await postEvent(prisma, datos, decoded.id);

            if (!result) {
                const error = "Hubo un error creando el evento, revise los datos";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            console.log("Response /create-my-event:", result);
            res.status(201).json(result);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    return router;
}

export default UserRoute;