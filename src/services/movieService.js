import Movie from "../models/Movie.js";

export default {
    getAll() {
        return Movie.find();
    },
    create(movieData) {
        // TODO Create movie
        console.log(movieData);
    }
}
