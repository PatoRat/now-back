import { PrismaClient } from "@prisma/client";
import { EventData, UbicacionData } from "../../scripts/types";
import { distancia } from "../../scripts/funciones";

type Coordenadas = Omit<UbicacionData, "direccion">

const getEvents = async (prisma: PrismaClient) => {
    const events = await prisma.event.findMany({
        include: {
            ubicacion: true, // si querés incluir la ubicación también
            imagenes: true,   // aquí incluís las imágenes
            creador: true
        }
    });
    return events;
}

const addFav = async (prisma: PrismaClient, eventId: number, userId: number) => {
    return await prisma.event.update({
        where: { id: eventId },
        data: {
            fans: {
                connect: { id: userId } // agrega el usuario como fan
            }
        },
        include: { fans: true }
    });
}

const getEventsFiltered = async (prisma: PrismaClient, coordenadasUsuario: Coordenadas) => {
    const eventos = await prisma.event.findMany({
        include: {
            ubicacion: true,
            imagenes: true,
            creador: {
                select: {
                    id: true,
                    nombre: true,
                    numeroAvatar: true,
                    email: true
                }
            }
        }
    });

    const eventosFiltrados = eventos.filter(evento => distancia(
        coordenadasUsuario.latitud,
        coordenadasUsuario.longitud,
        evento.ubicacion?.latitud as number,
        evento.ubicacion?.longitud as number
    ) < 10); // km
    return eventosFiltrados;
}

const getUbicacionFromEvent = async (prisma: PrismaClient, eventId: number) => {
    const result = await prisma.ubicacion.findUnique({
        where: { eventId: eventId }
    });
    if (!result) {
        throw new Error("No existe esta ubicacion");
    }
    return result;
}
const getFavsFromUser = async (prisma: PrismaClient, userId: number) => {
    const userWithFavs = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            favs: {
                include: {
                    ubicacion: true,
                    imagenes: true,
                    creador: true
                }
            }
        }
    });

    if (!userWithFavs) {
        throw new Error("Usuario no encontrado");
    }

    return userWithFavs.favs;
};


const getMyEvents = async (
    prisma: PrismaClient,
    creadorId: number) => {
    const result = await prisma.event.findMany({
        where: { userId: creadorId },
        include: {
            ubicacion: true,
            imagenes: true,
            creador: {
                select: {
                    id: true,
                    nombre: true,
                    numeroAvatar: true,
                    email: true
                }
            }
        }
    });
    return result;
}

const postEvent = async (
    prisma: PrismaClient,
    datos: EventData,
    creadorId: number) => {
    try {
        const result = await prisma.event.create({
            data: {
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                creador: { connect: { id: creadorId } },
                fechaInicio: datos.fechaInicio,
                fechaFin: datos.fechaFin,
                ubicacion: {
                    create: {
                        direccion: datos.ubicacion.direccion,
                        latitud: datos.ubicacion.latitud,
                        longitud: datos.ubicacion.longitud
                    }
                }
            }
        });

        return result;

    } catch (error) {
        console.error("Error creando evento", error);
        return null;
    }
}

const removeFav = async (prisma: PrismaClient, eventId: number, userId: number) => {
    return prisma.event.update({
        where: { id: eventId },
        data: {
            fans: {
                disconnect: { id: userId } // remueve el usuario de fans
            }
        },
        include: { fans: true }
    });
}

export {
    getEvents,
    getEventsFiltered,
    postEvent,
    getUbicacionFromEvent,
    getMyEvents,
    getFavsFromUser,
    addFav,
    removeFav
};