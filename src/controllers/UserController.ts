import { PrismaClient } from "@prisma/client";

const getUsers = async (prisma: PrismaClient) => {
    return await prisma.user.findMany();
}

// const postUser = async (
//     prisma: PrismaClient,
//     titulo: string,
//     imagenURL: string,
//     descripcion: string,
//     precio: string) => {
//     return await prisma.user.create({
//         data: {
//             titulo,
//             imagenURL,
//             descripcion,
//             precio,
//         },
//     });
// }

export { getUsers, postUser };