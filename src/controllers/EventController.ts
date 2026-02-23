import { PrismaClient } from "@prisma/client";
import { EventData, UbicacionData } from "../../scripts/types";
import { distancia } from "../../scripts/funciones";

type Coordenadas = Omit<UbicacionData, "direccion">

const getEvents = async (prisma: PrismaClient) => {
    const events = await prisma.event.findMany({
        where: { estaEliminado: false },
        include: {
            ubicacion: true, // si querés incluir la ubicación también
            imagenes: true,   // aquí incluís las imágenes
            creador: {
                select: {
                    id: true,
                    nombre: true,
                    numeroAvatar: true,
                    email: true
                }
            },
            _count: {
                select: {
                    fans: true
                }
            }
        }
    });
    return events;
}

const getEventById = async (prisma: PrismaClient, eventId: number) => {
    // console.log("\n\n\neventId en controller:", eventId);
    // console.log("#############################");
    const event = await prisma.event.findFirst({
        where: { id: eventId, estaEliminado: false },
        include: {
            ubicacion: true, // si querés incluir la ubicación también
            imagenes: true,   // aquí incluís las imágenes
            creador: {
                select: {
                    id: true,
                    nombre: true,
                    numeroAvatar: true,
                    email: true
                }
            },
            _count: {
                select: {
                    fans: true
                }
            }
        }
    });
    return event;
}

const addFav = async (prisma: PrismaClient, eventId: number, userId: number) => {
    return await prisma.event.update({
        where: {
            id: eventId,
            estaEliminado: false
        },
        data: {
            fans: {
                connect: { id: userId } // agrega el usuario como fan
            }
        },
        include: { fans: true }
    });
}
const getEventsFiltered = async (
    prisma: PrismaClient,
    coordenadasUsuario: Coordenadas,
    rangoMin: number,
    rangoMax: number
) => {

    const eventos = await prisma.event.findMany({
        where: { estaEliminado: false },
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
            },
            _count: {
                select: {
                    fans: true
                }
            }
        }
    });

    const eventosFiltrados = eventos.filter(evento => {
        if (!evento.ubicacion) return false;

        const d = distancia(
            coordenadasUsuario.latitud,
            coordenadasUsuario.longitud,
            evento.ubicacion.latitud,
            evento.ubicacion.longitud
        );

        return d >= rangoMin && d <= rangoMax;
    });

    return eventosFiltrados;
};


const getUbicacionFromEvent = async (prisma: PrismaClient, eventId: number) => {
    const result = await prisma.ubicacion.findUnique({
        where: { eventId: eventId }
    });
    if (!result) {
        throw new Error("No existe esta ubicacion");
    }
    return result;
}

const findFav = async (prisma: PrismaClient, eventId: number) => {
    return await prisma.event.findUnique({
        where: { id: eventId },
        include: {
            fans: true,
        },
    });
}

const getFavsFromUser = async (prisma: PrismaClient, userId: number) => {
    const userWithFavs = await prisma.user.findUnique({
        where: {
            id: userId,
            estaEliminado: false
        },
        include: {
            favs: {
                include: {
                    ubicacion: true,
                    imagenes: true,
                    creador: true,
                    _count: {
                        select: {
                            fans: true
                        }
                    }
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
        where: {
            userId: creadorId,
            estaEliminado: false
        },
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
            },
            _count: {
                select: {
                    fans: true
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
    return await prisma.event.update({
        where: {
            id: eventId,
            estaEliminado: false
        },
        data: {
            fans: {
                disconnect: { id: userId } // remueve el usuario de fans
            }
        },
        include: { fans: true }
    });
}

const deleteEvent = async (prisma: PrismaClient, eventId: number, userId: number) => {
    return await prisma.event.update({
        where: {
            id: eventId,
            userId: userId,
            estaEliminado: false
        },
        data: {
            estaEliminado: true
        },
    });
}

export {
    deleteEvent,
    getEvents,
    getEventsFiltered,
    postEvent,
    getUbicacionFromEvent,
    getMyEvents,
    getFavsFromUser,
    addFav,
    removeFav,
    getEventById,
    findFav
};