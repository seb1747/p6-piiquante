
// import de multer pour la gestion des fichiers
const multer = require('multer')
//création du dictionnaires d'extensions de fichiers images 
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
// logique de gestion des fichiers images 

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + '.' + extension)
  },
});

module.exports = multer({storage}).single('image');