import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser, confirmLogin, getUserById } from '../controllers/UserController'
import { UserData } from "../../scripts/types";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";
import { hashPassword } from "../../scripts/funciones";

const UserRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.get('/', async (req, res) => {
        const users = await getUsers(prisma);

        console.log("Response /:", users);
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

            const result: Omit<typeof user, "email" | "contrasenia_hash" | "sal"> = {
                id: user.id,
                nombre: user.nombre,
                numeroAvatar: user.numeroAvatar,
                favs: user.favs
            };

            console.log("Response /my-user:", result);
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
            return res.status(409).json({ error: error });
        }

        console.log("Response /register:", user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        res.status(201).json(token);
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await confirmLogin(prisma, email, password);

        if (!user) {
            const error = "No existe ningun usuario registrado con ese mail";
            console.error(error);
            return res.status(401).json({ error: error });
        }

        const contraseniaHasheada = await hashPassword(password, user.sal);

        if(user.contrasenia_hash != contraseniaHasheada){
            const error = "Contrasenia incorrecta";
            console.error(error);
            return res.status(401).json({ error: error });
        }

        console.log("Response /login:", user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        // console.log(token); solo para testear
        res.status(200).json(token);
    });

    return router;
}


export default UserRoute;