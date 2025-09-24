import Movie from "../models/Movie.js";

export default {
    async getAll(filter) {
        const result = await Movie.find(filter).lean();

        // const resultObj = result.map(movie => movie.toObject());
        
        return result;
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
