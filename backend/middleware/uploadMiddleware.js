import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})


function checkFileType(file, cb) {
 
  const filetypes = /jpeg|jpg|png|gif/
  
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
 
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb("Error: Images Only!")
  }
}