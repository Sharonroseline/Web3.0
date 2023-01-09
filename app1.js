//const process = require("process");
//const minimist = require("minimist");
const { Web3Storage, getFilesFromPath } = require("web3.storage");

const fs = require("fs");
var path = require('path')
const express = require("express"); //express
const app = express();

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwM2QxQzE5M0I3OWY4NjAyNmRjNTYwNDI5NzgyNmFDNDQ1YjU1RjciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njc4Mjk4MTAyMDksIm5hbWUiOiJsYXRlc3QgdG9rZW4ifQ.ogdJtontgOSFcaq-AcpPgmBvwbt4AiIbm4lpHYFmPt4"
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/profile", upload.single("file"), async function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file);

  const storage = new Web3Storage({ token });
  const pathFiles = await getFilesFromPath(req.file.path);
  console.log(`Uploading files`);
  const cid = await storage.put(pathFiles);
  console.log("Content added with CID:", cid);

  res.send({ cid: cid });
});
app.listen(3000);
