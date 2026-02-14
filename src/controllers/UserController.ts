import { PrismaClient } from "@prisma/client";
import { UserData } from "../../scripts/types";
import { hashPassword, randomSalt } from "../../scripts/funciones";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
}

const getUserByEmail = async (
    prisma: PrismaClient,
    email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
            estaEliminado: false
        }
    });
}

const getUserById = async (
    prisma: PrismaClient,
    userId: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
            estaEliminado: false
        },
        select: {
            id: true,
            email: true,
            nombre: true,
            numeroAvatar: true
        }
    });
}

const deleteUserById = async (
    prisma: PrismaClient,
    userId: number) => {
    return await prisma.user.update({
        where: {
            id: userId,
            estaEliminado: false
        },
        data: {
            estaEliminado: true
        }
    });
}


const cambiarAvatar = async (
    prisma: PrismaClient,
    userId: number,
    indexAvatar: number) => {
    return await prisma.user.update({
        where: {
            id: userId,
            estaEliminado: false
        },
        data: {
            numeroAvatar: indexAvatar
        },

    });
}

const postUser = async (
    prisma: PrismaClient,
    datos: Omit<UserData, "favs">) => {
    try {
        const sal = randomSalt(16);
        const contraseniaHasheada = await hashPassword(datos.contrasenia, sal);
        const result = await prisma.user.create({
            data: {
                nombre: datos.nombre,
                contrasenia_hash: contraseniaHasheada,
                sal: sal,
                email: datos.email,
                numeroAvatar: datos.numeroAvatar,
            }
        });
        return result;

    } catch (error) {
        console.error("Ocurrio un error: ", error);
        return null;
    }
}

export { getUsers, getUserById, deleteUserById, getUserByEmail, postUser, cambiarAvatar };