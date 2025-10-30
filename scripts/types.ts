type EventData = {
    token: string,
    titulo: string,
    descripcion: string,
    direccion: string,
    fechaInicio: Date,
    fechaFin: Date
}

type UserData = {
    email: string,
    nombre: string,
    contrasenia: string
}

export { EventData, UserData }