const multer = require("multer");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs");

function createUploadPath(req) {
  const newDirectory = req.baseUrl.split("/").pop();
  const directory = path.join(__dirname, "..", "..", "public", "uploads", newDirectory);
  req.body.fileUploadPath = path.join("uploads", newDirectory);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file?.originalname) {
      const filePath = createUploadPath(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: function (req, file, cb) {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime()) + ext;
      req.body.filename = fileName;
      return cb(null, fileName);
    }
  },
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimetypes = [".jpg", ".jpeg", ".png"];

  if (mimetypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("فرمت ارسال شده صحیح نمی باشد"));
}

const pictureMaxSize = 1 * 1000 * 512; // => 512 KB

const uploadMulter = multer({ storage, fileFilter, limits: { fileSize: pictureMaxSize } });

module.exports = { uploadMulter };
