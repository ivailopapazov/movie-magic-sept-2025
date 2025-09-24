import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        return Movie.find();
    },
    getOne(movieId) {
        return Movie.findOne({_id: movieId});
    },
    create(movieData) {
        movieData.rating = Number(movieData.rating);

        const movie = new Movie(movieData);

        return movie.save();
    }
}
