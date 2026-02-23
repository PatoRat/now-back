import { PrismaClient } from "@prisma/client";
import { ReportData } from "../../scripts/types";

const postReport = async (
    prisma: PrismaClient,
    datos: ReportData,
    creadorId: number) => {
    try {
        const result = await prisma.reporte.create({
            data: {
                eventoReportado: { connect: { id: datos.eventId } },
                motivo: datos.motivo,
                descripcion: datos.descripcion,
                usuarioEmisor: { connect: { id: creadorId } },
                fecha: datos.fecha,
                estado: datos.estado
            }
        });

        return result;

    } catch (error) {
        console.error("Error creando reporte", error);
        return null;
    }
}

export {
    postReport
};