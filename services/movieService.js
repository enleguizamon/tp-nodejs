const Movie = require("./../models/movieModel");

class MovieService {
  getMovies() {
    const query = Movie.find().exec();
    return query;
  }

  getMovieById(id) {
    const movie = Movie.findOne({ _id: id}).exec();
    return movie;
  }

  addMovie(movie) {
    const newMovie = new Movie(movie);
    return newMovie.save();
  }

  editMovie(id, data) {
    const editedMovie = Movie.findOneAndUpdate({ _id: id }, data).exec();
    return editedMovie;
  }

  async deleteMovie(id) {
    const deleted = await Movie.deleteOne({ _id: id });

    if (deleted.deletedCount > 0) {
      return true; 
    } else {
      return false;
    }
  }
}

module.exports = MovieService;