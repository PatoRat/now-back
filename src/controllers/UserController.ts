import { PrismaClient } from "@prisma/client";
import { UserData } from "../types";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
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

export { getUsers, postUser };