import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser, confirmLogin } from '../controllers/UserController'
import { UserData } from "../../scripts/types";
import jwt from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getUsers(prisma);
        console.log(products);
        res.json(products)
    });

    router.post('/register', async (req, res) => {
        const datos: UserData = req.body;
        const result = await postUser(prisma, datos);
        if (!result) {
            const error = "El email con el que se intenta registrar ya existe";
            console.error(error);
            return res.status(401).json({ error: error });
        }
        console.log(result);
        const token = jwt.sign({ id: result?.id }, SECRET_KEY_JWT);
        res.json({ token });
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await confirmLogin(prisma, email, password);
        if (!user) {
            const error = "El usuario o contraseña son incorrectos";
            console.error(error);
            return res.status(401).json({ error: error });
        }
        console.log(user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        res.json({ token });
    });

    return router;
}


export default UserRoute;