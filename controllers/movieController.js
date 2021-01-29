class MovieController {
  constructor(movieService) {
    this.movieService = movieService;
  }

  isValidObjectId(id) {
    const ObjectID = require("mongodb").ObjectID;
    return ObjectID.isValid(id);
  }

  async getMovies(req, res) {
    const logged = req.user;

    if (logged) {
      try {
        const movies = await this.movieService.getMovies();

        if (movies) {
          return res.status(200).json(movies);
        } else {
          return res.status(400).send("no hay películas/series para mostrar");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("error inesperado");
      }
    } else {
      return res.status(401).send("debes loguearte para realizar esta acción");
    }
  }

  async getMovieById(req, res) {
    const logged = req.user;
    const { id } = req.params;

    if (logged) {
      if (!this.isValidObjectId(id)) {
        return res.status(400).send("ingrese un id válido");
      }
      try {
        const movieById = await this.movieService.getMovieById(id);
        if (movieById) {
          return res.status(200).json(movieById);
        } else {
          return res.status(400).send("película/serie no encontrada");
        }
      } catch (e) {
        console.log(e);
        res.status(500).send("error inesperado");
      }
    } else {
      return res.status(401).send("debes loguearte para realizar esta acción");
    }
  }

  async addMovie(req, res) {
    const { body } = req;
    const name = body.name.toLowerCase();
    const image = req.file.path;

    if (!name) {
      res.status(400).send("nombre requerido");
    }

    if (!image) {
      res.status(400).send("imagen requerida");
    }

    const newMovie = {
      name: name,
      category: body.category,
      type: body.type,
      image: image,
    };

    try {
      const response = await this.movieService.addMovie(newMovie);

      if (response) {
        return res.status(201).send("película/serie agregada");
      } else {
        return res.status(400).send("error al agregar la película/serie");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async editMovie(req, res) {
    const { id } = req.params;
    const { data } = req.body;

    if (!this.isValidObjectId(id)) {
      return res.status(400).send("ingrese un id válido");
    }

    try {
      const edited = await this.movieService.editMovie(id, data);
      if (edited) {
        return res.status(200).send("se modificó la película/serie");
      } else {
        return res.status(404).send("id inexistente");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async deleteMovie(req, res) {
    const { id } = req.params;

    if (!this.isValidObjectId(id)) {
      return res.status(400).send("ingrese un id válido");
    }

    try {
      const deleted = await this.movieService.deleteMovie(id);
      if (deleted) {
        return res.status(200).send("se borró la película/serie");
      } else {
        return res.status(400).send("no se encontró la película/serie");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }
}

module.exports = MovieController;
