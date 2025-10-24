type EventData = {
    nombre: string,
    descripcion: string,
    direccion: string,
    creadorEmail: string,
    fechaInicio: Date,
    fechaFin: Date
}

type UserData = {
    email: string,
    nombre: string,
    contrasenia: string
}

export { EventData, UserData }