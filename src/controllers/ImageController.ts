import { PrismaClient } from "@prisma/client";

const getImages = async (prisma: PrismaClient) => {
    return await prisma.imagenDeEvento.findMany();
}

const postImage = async (
    prisma: PrismaClient,
    imagenes: { url: string }[],
    eventId: number) => {

    // console.log("eventId: ", eventId);

    for (const img of imagenes) { // No uso el createMany porque no puedo hacer el connect sino
        try {
            await prisma.imagenDeEvento.create({
                data: {
                    url: img.url,
                    event: { connect: { id: eventId } },// Me lo guardo de la query anterior
                },
            });

        } catch (error) {
            console.error("No se encontró evento con tal id", error);
            return null;
        }
    }

    return await prisma.imagenDeEvento.findMany({
        where: {
            eventId: eventId
        }
    });
}

export { getImages, postImage };