import { type PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";
import { getReports, postReport } from "../controllers/ReportController";

const ReportRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const datos = req.body;

            const result = await postReport(prisma, datos, decoded.id);

            if (!result) {
                const error = "Hubo un error creando el reporte, revise los datos";
                console.error(error);
                return res.status(404).json({ error: error });
            }

            console.log("Response /:", result);
            res.status(201).json(result);
        }
        catch (error) {
            console.error("Acceso no autorizado", error);
            return res.status(401).json({ error: error });
        }
    });

    router.get('/', async (req, res) => {

        const reportes = await getReports(prisma);

        if (!reportes) {
            const error = "No se encontraron reportes pendientes";
            console.error(error);
            return res.status(404).json({ error: error });
        }

        console.log("Response /:", reportes);
        res.status(200).json(reportes)

    });

    return router;
}

export default ReportRoute;