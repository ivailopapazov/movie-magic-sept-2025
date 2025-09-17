import Movie from "../models/Movie.js";

export default {
    getAll() {
        return Movie.find();
    }
}
