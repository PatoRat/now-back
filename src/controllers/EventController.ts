import { PrismaClient, Prisma } from "@prisma/client";
import { EventData } from "../../scripts/types";
import { distancia } from "../../scripts/funciones";

const getEvents = async (prisma: PrismaClient) => {
    return await prisma.event.findMany();
}

const getEventsFiltered = async (prisma: PrismaClient) => {// cambiar
    const eventos = await prisma.event.findMany();
    const eventosFiltrados = eventos.filter(evento => distancia(1, 2, 3, 4) < 10);
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
                fechaFin: datos.fechaFin
                // ver con ubicacion
            }
        });
        return result;
    } catch (error) {
        console.error("El usuario no existe", error);
        return null;
    }
}

export { getEvents, getEventsFiltered, postEvent, getUbicacionFromEvent };