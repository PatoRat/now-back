import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getEvents, getEventsFiltered, getMyEvents, getUbicacionFromEvent, postEvent, getFavsFromUser, addFav, removeFav, deleteEvent } from '../controllers/EventController'
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

            const eventsMapeo = events.map(event => {
                const { _count, ...resto } = event;

                return {
                    ...resto,
                    likesCont: _count.fans
                };
            });

            console.log("Response /all:", eventsMapeo);
            res.status(200).json(eventsMapeo)

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }

    });

    // ACA FILTRAMOS LOS FAVS

    router.get('/favs', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {

            // Decodificamos el JWT para obtener el userId
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            // Obtenemos los favoritos del usuario
            const favEvents = await getFavsFromUser(prisma, userId);

            const favEventsMapeo = favEvents.map(event => {
                const { _count, ...resto } = event;

                return {
                    ...resto,
                    likesCont: _count.fans
                };
            });

            console.log(`Response /favs para usuario ${userId}:`, favEventsMapeo);
            res.status(200).json(favEventsMapeo);

        } catch (error) {
            console.error("Acceso no autorizado a /favs", error);
            return res.status(401).json({ error: "Acceso no autorizado" });
        }
    });


    // ACA BBUSCAMOS SI TIENE LIKE
    router.get('/check-like/:eventId', async (req, res) => {
        const token = req.headers?.authorization?.split(" ")[1] || "";
        const { eventId } = req.params;

        try {
            if (!token) throw new Error("No hay token");

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            const eventWithFanCheck = await prisma.event.findUnique({
                where: { id: Number(eventId) },
                include: {
                    fans: true,
                },
            });

            const userLiked = eventWithFanCheck?.fans.some(fan => fan.id === userId) || false;

            res.status(200).json(
                userLiked
            );

        } catch (error) {
            console.error("Error buscando like:", error);
            res.status(400).json({ error: "No se pudo buscar el like" });
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
            const updatedEvent = await addFav(prisma, Number(eventId), userId);

            if (!updatedEvent) {
                return res.status(400).json({ error: "No se pudo agregar a favoritos" });
            }

            console.log("Response /add-fav: ", updatedEvent);
            res.status(200).json({ event: updatedEvent/* , user: updatedUser */ });

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    router.delete('/rem-fav', async (req, res) => {
        const token = req.headers?.authorization?.split(" ")[1] || "";
        const { eventId } = req.body;

        try {

            if (!token) throw new Error("No hay token");
            if (!eventId) throw new Error("eventId es requerido");

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            // Remover relación fan/fav
            const updatedEvent = await removeFav(prisma, Number(eventId), userId);

            if (!updatedEvent) {
                return res.status(400).json({ error: "No se pudo agregar a favoritos" });
            }

            console.log("Response /rem-fav: ", updatedEvent);
            res.status(200).json({ event: updatedEvent });

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });


    router.post('/', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const { coordenadasUsuario, rangoMin, rangoMax } = req.body;

            if (
                !coordenadasUsuario ||
                typeof rangoMin !== "number" ||
                typeof rangoMax !== "number"
            ) {
                return res.status(400).json({ error: "Parámetros inválidos" });
            }

            const events = await getEventsFiltered(
                prisma,
                coordenadasUsuario,
                rangoMin,
                rangoMax
            );

            const eventsMapeo = events.map(event => {
                const { _count, ...resto } = event;

                return {
                    ...resto,
                    likesCont: _count.fans
                };
            });

            console.log("Response /:", eventsMapeo);
            res.status(200).json(eventsMapeo);

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

            const resultMapeo = result.map(event => {
                const { _count, ...resto } = event;

                return {
                    ...resto,
                    likesCont: _count.fans
                };
            });

            console.log("Response /created-by-authorized-user:", resultMapeo);
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

    router.delete('/delete-event', async (req, res) => {
        const token = req.headers?.authorization?.split(" ")[1] || "";
        const { eventId } = req.body;

        try {

            if (!token) throw new Error("No hay token");
            if (!eventId) throw new Error("eventId es requerido");

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const userId = decoded.id;

            // Remover relación fan/fav
            const deletedEvent = await deleteEvent(prisma, Number(eventId), userId);

            if (!deletedEvent) {
                return res.status(400).json({ error: "No se pudo eliminar el evento" });
            }

            console.log("Response /rem-fav: ", deletedEvent);
            res.status(200).json({ event: deletedEvent });

        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    return router;
}

export default UserRoute;