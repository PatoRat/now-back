import { PrismaClient } from "@prisma/client";
import { UserData } from "../../scripts/types";
import { hashPassword, randomSalt } from "../../scripts/funciones";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
}

const confirmLogin = async (
    prisma: PrismaClient,
    email: string,
    contrasenia: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email
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
                include: {
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
        console.error("El email ya está registrado", error);
        return null;
    }
}

export { getUsers, getUserById, postUser, confirmLogin };