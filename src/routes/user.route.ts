import { type PrismaClient, type Prisma } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser } from '../controllers/UserController'

const ProductRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getUsers(prisma);
        console.log(products);
        res.json(products)
    });

    router.post('/create', async (req, res) => {
        const { titulo, imagenURL, descripcion, precio } = req.body
        const result = await postUser(prisma, titulo, imagenURL, descripcion, precio);
        console.log(result);
        res.json(result)
    });

    return router;
}



export default ProductRoute;