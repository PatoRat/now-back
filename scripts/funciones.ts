import crypto from "crypto";

// La saqué de internet, supuestamente es más exacta a la hora de usar
// latitudes y longitudes que: sqrt( (lat2 - lat1)² + (lon2 - lon1)² )
const distancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // En km
}

// La hicimos con unos compañeros para explicar PBKDF2, pero la simplifiqué
const hashPassword = async (password: string, salt: string): Promise<string> => {

  const hash: string = await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 50000, 32, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
  return hash;
}

const randomSalt = (bytes = 16) => crypto.randomBytes(bytes).toString("hex");

export { distancia, hashPassword, randomSalt };