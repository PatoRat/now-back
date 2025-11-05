const port = process.env.PORT || 3000;
const BACK_URL = `http://localhost:${port}`;

// Esta es la clave cifrada para el JWT de la app Now
const SECRET_KEY_JWT = "ek1vrqfharXDqye/f3SfAPH6/jUUBVIBN1xVIH6ho8OkuhDveU2HVGxYdH25EK/T8KTLBnPE3KQvCJlgkIA1dw=";

export {port, BACK_URL, SECRET_KEY_JWT};