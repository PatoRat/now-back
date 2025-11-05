import multer from "multer";

const storage = multer.diskStorage({
  destination: '/uploads',
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.fieldname)
  }
})

const upload = multer({ storage: storage })


export { upload };