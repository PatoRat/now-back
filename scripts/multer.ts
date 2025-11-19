import multer from "multer";
import fs from "fs";
import path from "path";

// Carpeta donde querés guardar los archivos dentro del proyecto
const uploadDir = path.join(__dirname, "..", "uploads");

// Crear la carpeta si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("uploadDir: ", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ""; // ej: ".png"
    cb(null, `${uniqueSuffix}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

export { upload, uploadDir };

// IA tambien, muy extraña la librería