const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "c08464fd0fcf4363930bef28628a4109"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, { url: req.body.url })
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Unable to fetch"));
};

const handleImageCount = (req, res, db, bcrypt) => {
  db("users")
    .where("id", "=", req.body.id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.send(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to fetch entries!"));
};

module.exports = {
  handleImageCount,
  handleApiCall
};
