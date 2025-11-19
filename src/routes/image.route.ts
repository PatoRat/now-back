import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getImages, postImage } from '../controllers/ImageController'
import { upload } from "../../scripts/multer"
import { BACK_URL } from "../../config"
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";

const ImageRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getImages(prisma);

        console.log("Response /:", products);
        res.status(200).json(products)
    });

    router.post('/save', upload.array("imagenes"), async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
        } catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }

        try {
            const files = req.files as Express.Multer.File[];
            const { eventId } = req.body;

            console.log("Imagenes recibidas: ", files);

            const imagenes = files.map(f => ({
                url: `${BACK_URL}/uploads/${f.filename}`,
            }));

            // console.log(+eventId);

            const result = await postImage(prisma, imagenes, +eventId);

            // console.log(result);

            if (!result) {
                const error = "No existe tal evento";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            console.log("Response /save:", result);
            res.status(201).json(result);

        } catch (error) {
            console.error("No se puedo cargar las imagenes", error);
            res.status(401).json({ error: error });
        }
    });

    router.post('/save-sin-archivos', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const { eventId, imagenes } = req.body;

            const result = await postImage(prisma, imagenes, eventId);

            if (!result) {
                const error = "No existe tal evento";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            console.log("Response /save:", result);
            res.status(201).json(result);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            res.status(401).json({ error: error });
        }
    });

    return router;
}

export default ImageRoute;