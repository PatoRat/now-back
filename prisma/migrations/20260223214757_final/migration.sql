-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "contrasenia_hash" TEXT NOT NULL,
    "sal" TEXT NOT NULL,
    "numeroAvatar" INTEGER NOT NULL,
    "estaEliminado" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "userId" INTEGER,
    "estaEliminado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImagenDeEvento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    CONSTRAINT "ImagenDeEvento_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Ubicacion" (
    "eventId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitud" REAL NOT NULL,
    "longitud" REAL NOT NULL,
    "direccion" TEXT NOT NULL,
    CONSTRAINT "Ubicacion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Reporte_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reporte_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,
    CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EventosFavoritos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventosFavoritos_A_fkey" FOREIGN KEY ("A") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventosFavoritos_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "_EventosFavoritos_AB_unique" ON "_EventosFavoritos"("A", "B");

-- CreateIndex
CREATE INDEX "_EventosFavoritos_B_index" ON "_EventosFavoritos"("B");
