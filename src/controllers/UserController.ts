import { PrismaClient } from "@prisma/client";
import { UserData } from "../../scripts/types";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
}

const confirmLogin = async (
    prisma: PrismaClient,
    email: string,
    contrasenia: string ) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
            contrasenia: contrasenia
        }
    });
}

const postUser = async (
    prisma: PrismaClient,
    datos: UserData) => {
    return await prisma.user.create({
        data: {
            ...datos
        },
    });
}

export { getUsers, postUser, confirmLogin };