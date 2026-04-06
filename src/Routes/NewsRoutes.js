const express = require("express");
const router = express.Router();
const upload = require("../middleware/Upload");
const {
  addNews,
  getNews,
} = require("../controllers/NewsController");

router.post(
  "/add",
  upload.fields([
    { name: "image" },
    { name: "video" },
  ]),
  addNews
);

router.get("/", getNews);

module.exports = router;