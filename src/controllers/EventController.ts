import { PrismaClient, Prisma } from "@prisma/client";
import { EventData } from "../types";

const getEvents = async (prisma: PrismaClient) => {
    return await prisma.event.findMany();
}

const getEventsFiltered = async (prisma: PrismaClient) => {
    //ver como hacer
}

const postEvent = async (
    prisma: PrismaClient,
    datos: EventData) => {
    return await prisma.event.create({
        data: {
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            direccion: datos.direccion,
            creador: { connect: { email: datos.creadorEmail } },
            fechaInicio: datos.fechaInicio,
            fechaFin: datos.fechaFin
        }
    });
}

export { getEvents, getEventsFiltered, postEvent };