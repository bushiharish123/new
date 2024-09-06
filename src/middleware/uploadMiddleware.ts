// middleware/uploadMiddleware.ts
import multer from 'multer';
import path from 'path';

// Configure multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder for storing images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Initialize multer with the defined storage options
const upload = multer({ storage: storage });

export default upload;
