import { type PrismaClient } from "@prisma/client"
import { Router } from "express"
import { getUsers, postUser, getUserById, getUserByEmail, cambiarAvatar } from '../controllers/UserController'
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


    router.put('/cambiar-avatar/:index', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {

            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;
            const { index } = req.params;
            const user = await cambiarAvatar(prisma, decoded.id, Number(index));

            if (!user) {
                const error = "El usuario no existe";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            const { id, email, numeroAvatar } = user;

            console.log("Response /cambiarAvatar/:index:", {id, email, numeroAvatar});
            res.status(200).json(user.numeroAvatar);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            res.status(401).json({ error: error });
        }
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

            console.log("Response /my-user:", user);
            res.status(200).json(user);

        } catch (error) {
            console.error("Acceso no autorizado", error);
            res.status(401).json({ error: error });
        }
    });

    router.post('/register', async (req, res) => {
        const datos: UserData = req.body;

        const userExistente = await getUserByEmail(prisma, datos.email);

        if (userExistente) {
            const error = "El email ya se encuentra registrado";
            console.error(error);
            return res.status(409).json({ error: error });
        }

        const user = await postUser(prisma, datos);

        if (!user) {
            const error = "Error durante la creacion";
            console.error(error);
            return res.status(409).json({ error: error });
        }

        console.log("Response /register:", user);
        const token = jwt.sign({ id: user?.id }, SECRET_KEY_JWT);
        res.status(201).json(token);
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(prisma, email);

        if (!user) {
            const error = "No existe ningun usuario registrado con ese mail";
            console.error(error);
            return res.status(401).json({ error: error });
        }

        const contraseniaHasheada = await hashPassword(password, user.sal);

        if (user.contrasenia_hash != contraseniaHasheada) {
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