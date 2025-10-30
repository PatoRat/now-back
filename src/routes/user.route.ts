import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser, confirmLogin } from '../controllers/UserController'
import { UserData } from "../../scripts/types";

const jwt = require("jsonwebtoken");
// Esta es la clave cifrada para el JWT de la app Now
const SECRET_KEY_JWT = "ek1vrqfharXDqye/f3SfAPH6/jUUBVIBN1xVIH6ho8OkuhDveU2HVGxYdH25EK/T8KTLBnPE3KQvCJlgkIA1dw=";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const products = await getUsers(prisma);
        console.log(products);
        res.json(products)
    });

    router.post('/create', async (req, res) => {
        const datos: UserData = req.body;
        const result = await postUser(prisma, datos);
        console.log(result);
        const token = jwt.sign({id: result?.id}, SECRET_KEY_JWT);
        res.json({token});
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await confirmLogin(prisma, email, password);
        if (!user) {
            console.error("Credenciales inválidas");
            return res.status(401).json({ error: 'El usuario o contraseña son incorrectos' });
        }
        console.log(user);
        const token = jwt.sign({id: user?.id}, SECRET_KEY_JWT);
        res.json({token});
    });

    return router;
}


export default UserRoute;