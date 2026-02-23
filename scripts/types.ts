type EventData = {
    titulo: string,
    descripcion: string,
    fechaInicio: Date,
    fechaFin: Date,
    ubicacion: UbicacionData
};

type UbicacionData = {
    latitud: number,
    longitud: number,
    direccion: string
};

type UserData = {
    email: string,
    nombre: string,
    contrasenia: string,
    numeroAvatar: number,
};

type ReportData = {
    eventId: number,
    motivo: string,
    descripcion: string,
    fecha: Date,
    estado: "Pendiente" | "Aprobado" | "Denegado"
};

export { EventData, UserData, UbicacionData, ReportData }