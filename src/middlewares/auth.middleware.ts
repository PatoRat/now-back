import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { SECRET_KEY_JWT } from "../../config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = jwt.verify(
      token,
      SECRET_KEY_JWT   
    ) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id, estaEliminado: false }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuario inválido" });
    }

    (req as any).user = user;

    next();

  } catch (error) {
    console.error("Error JWT:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
};