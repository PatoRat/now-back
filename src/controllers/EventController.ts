import { PrismaClient, Prisma, Ubicacion } from "@prisma/client";
import { EventData, UbicacionData } from "../../scripts/types";
import { distancia } from "../../scripts/funciones";

type Coordenadas = Omit<UbicacionData, "direccion">

const getEvents = async (prisma: PrismaClient) => {
    return await prisma.event.findMany();
}

const getEventsFiltered = async (prisma: PrismaClient, coordenadasUsuario: Coordenadas) => {
    const eventos = await prisma.event.findMany({
        include: {
            ubicacion: true,
            imagenes: true
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

const getMyEvents = async (
    prisma: PrismaClient,
    creadorId: number) => {
    const result = await prisma.event.findMany({
        where: { userId: creadorId },
        include: {
            ubicacion: true,
            imagenes: true
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
        console.error("El usuario no existe", error);
        return null;
    }
}

export { getEvents, getEventsFiltered, postEvent, getUbicacionFromEvent, getMyEvents };