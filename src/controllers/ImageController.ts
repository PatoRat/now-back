import { PrismaClient } from "@prisma/client";

const getImages = async (prisma: PrismaClient) => {
    return await prisma.imagenDeEvento.findMany();
}

const postImage = async (
    prisma: PrismaClient,
    imagenes: { url: string }[],
    eventId: number) => {

    for (const img of imagenes) { // No uso el createMany porque no puedo hacer el connect sino
        await prisma.imagenDeEvento.create({
            data: {
                url: img.url,
                event: { connect: { id: eventId } },
            },
        });
    }

    return getImages(prisma);
}

export { getImages, postImage };