const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

// function createUploadPath(req) {
//   const newDirectory = req.baseUrl.split("/").pop();
//   const directory = path.join(process.cwd(), "public", "uploads", newDirectory);
//   req.body.fileUploadPath = path.join("uploads", newDirectory);
//   fs.mkdirSync(directory, { recursive: true });
//   return directory;
// }

function createUploadPath(req, profileUser) {
  const directory = path.join(process.cwd(), "public", "uploads", "profile", profileUser);
  req.body.fileUploadPath = path.join("uploads", "profile", profileUser);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file?.originalname) {
      if (file.fieldname === "studentProfile") {
        return cb(null, createUploadPath(req, "students"));
      } else if (file.fieldname === "teacherProfile") {
        return cb(null, createUploadPath(req, "teachers"));
      }
    }
    cb(null, null);
  },
  filename: function (req, file, cb) {
    if (file?.originalname) {
      const ext = path.extname(file.originalname);
      const fileName = String(new Date().getTime()) + ext;
      req.body.imageUrl = path.join("/", req.body.fileUploadPath, fileName);
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
  return cb(createHttpError.BadRequest("فرمت ارسال شده صحیح نمی باشد"));
}

const pictureMaxSize = 2 * 1000 * 512; // => 512 KB

const profileUploader = multer({ storage, fileFilter, limits: { fileSize: pictureMaxSize } });

module.exports = { profileUploader };
