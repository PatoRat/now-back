-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    "userId" INTEGER,
    "estaEliminado" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("descripcion", "fechaFin", "fechaInicio", "id", "titulo", "userId") SELECT "descripcion", "fechaFin", "fechaInicio", "id", "titulo", "userId" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "contrasenia_hash" TEXT NOT NULL,
    "sal" TEXT NOT NULL,
    "numeroAvatar" INTEGER NOT NULL,
    "estaEliminado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("contrasenia_hash", "email", "id", "nombre", "numeroAvatar", "sal") SELECT "contrasenia_hash", "email", "id", "nombre", "numeroAvatar", "sal" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
