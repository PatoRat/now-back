import { type PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../../config";
import { postReport } from "../controllers/ReportController";

const ReportRoute = (prisma: PrismaClient) => {
    const router = Router();

    router.post('/', async (req, res) => {
        const token = req?.headers?.authorization?.split(" ")[1] || "";

        try {
            const decoded = jwt.verify(token, SECRET_KEY_JWT) as JwtPayload;

            const datos = req.body;

            const result = await postReport(prisma, datos, decoded.id);
        }
        catch (error) {

        }
    })

    return router;
}

export default ReportRoute;