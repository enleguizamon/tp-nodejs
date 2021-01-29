const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/movieController");
const MovieService = require("../services/movieService");
const MovieInstance = new MovieController(new MovieService());
const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const UserInstance = new UserController(new UserService());
const checkAuthAndAdmin = require("./../utils/checkAuthAndAdmin");
const passport = require("passport");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function (req, res) {
  res.send("hola");
});

router.get("/movies", (req, res) => {
  MovieInstance.getMovies(req, res);
});

router.get("/movies/:id", (req, res) => {
  MovieInstance.getMovieById(req, res);
});

router.post("/movies", checkAuthAndAdmin, upload.single("image"), (req, res) => {
  MovieInstance.addMovie(req, res);
});

router.put("/movies/edit/:id", checkAuthAndAdmin, (req, res) => {
  MovieInstance.editMovie(req, res);
});

router.delete("/movies/delete/:id", checkAuthAndAdmin, (req, res) => {
  MovieInstance.deleteMovie(req, res);
});

router.get("/users", (req, res) => {
  UserInstance.getUsers(req, res);
});

router.get("/users/:id", (req, res) => {
  UserInstance.getUserById(req, res);
});

router.post("/users", (req, res) => {
  UserInstance.addUser(req, res);
});

router.post("/users/login", passport.authenticate("local"), (req, res) => {
  UserInstance.loginUser(req, res);
});

router.put("/users/edit/:id", checkAuthAndAdmin, (req, res) => {
  UserInstance.editUser(req, res);
});

router.delete("/users/delete/:id", checkAuthAndAdmin, (req, res) => {
  UserInstance.deleteUser(req, res);
});

module.exports = router;
