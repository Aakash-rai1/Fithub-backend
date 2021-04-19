const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./media/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + 'fithub' + file.originalname);
    },
  });
const maxSize = 3 * 1024 * 1024; // for 1MB
 
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file )
    if ( file.mimetype == "image/png" ||file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb({success: false,
        msg: 'Invalid file type. Only jpg, png image files are allowed.'},false);
    }
  },
  limits: { fileSize: maxSize },
}).single('file');
module.exports = upload