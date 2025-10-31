type EventData = {
    token: string,
    titulo: string,
    descripcion: string,
    direccion: string,
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
    contrasenia: string
};

export { EventData, UserData }