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

export { EventData, UserData, UbicacionData }