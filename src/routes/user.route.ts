import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser, confirmLogin, getUserById } from '../controllers/UserController'
import { UserData } from "../../scripts/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const users = await getUsers(prisma);

        console.log(users);
        res.status(200).json(users)
    });

    router.get('/my-user', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const user = await getUserById(prisma, decoded.id);

            if (!user) {
                const error = "El usuario no existe";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            const result: Omit<typeof user, "email" | "contrasenia"> = {
                id: user.id,
                nombre: user.nombre,
                numeroAvatar: user.numeroAvatar,
                favs: user.favs
            };

            console.log("Datos del usuario:", result);
            res.status(200).json(result);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            res.status(401).json({ error: error });
        }
    });

    router.post('/register', async (req, res) => {
        const datos: UserData = req.body;
        const user = await postUser(prisma, datos);

        if (!user) {
            const error = "El email con el que se intenta registrar ya existe";
            console.error(error);
            return res.status(404).json({ error: error });
        }

        console.log(user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        res.status(201).json(token);
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await confirmLogin(prisma, email, password);

        if (!user) {
            const error = "El usuario o contraseña son incorrectos";
            console.error(error);
            return res.status(401).json({ error: error });
        }

        console.log("Usuario del login:", user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        // console.log(token); solo para testear
        res.status(202).json(token);
    });

    return router;
}


export default UserRoute;