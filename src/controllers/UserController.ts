import { PrismaClient } from "@prisma/client";
import { UserData } from "../../scripts/types";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
}

const confirmLogin = async (
    prisma: PrismaClient,
    email: string,
    contrasenia: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
            contrasenia: contrasenia
        }
    });
}

const getUserById = async (
    prisma: PrismaClient,
    userId: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            favs: {
                include:{
                    ubicacion: true,
                    imagenes: true
                }
            }
        }
    });
}

const postUser = async (
    prisma: PrismaClient,
    datos: Omit<UserData, "favs">) => {
    try {
        const result = await prisma.user.create({
            data: {
                ...datos
            }
        });
        return result;
    } catch (error) {
        console.error("El email ya está registrado", error);
        return null;
    }
}

export { getUsers, getUserById, postUser, confirmLogin };