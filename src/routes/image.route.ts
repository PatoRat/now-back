import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getImages, postImage } from '../controllers/ImageController'
import { upload } from "../../scripts/multer"
import { BACK_URL } from "../../config"

const ImageRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getImages(prisma);
        console.log(products);
        res.json(products)
    });

    router.post('/save', upload.array("imagenes"), async (req, res) => {
        const files = req.files as Express.Multer.File[];
        const { eventId } = req.body;
        const imagenes = files.map(f => ({
            url: `${BACK_URL}/uploads/${f.filename}`,
        }));
        const result = await postImage(prisma, imagenes, eventId);
        if (!result) {
            const error = "No existe tal evento";
            console.error(error);
            return res.status(401).json({ error: error });
        }
        console.log(result);
        res.json(result)
    });

    return router;
}

export default ImageRoute;