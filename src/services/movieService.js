import Movie from "../models/Movie.js";

export default {
    getAll(filter = {}) {
        let query = Movie.find();

        if (filter.title) {
            // TODO Search by title, partial match, case insensitive
            query = query.find({ title: { $regex: filter.title, $options: 'i' } });
        }

        if (filter.genre) {
            // TODO Search by genre, exact match, case insensitive
            query = query.find({ genre: { $regex: new RegExp(`^${filter.genre}$`), $options: 'i' } })
        }

        if (filter.year) {
            // TODO Search by year, exact match, case senstive
            query = query.where('year').equals(filter.year);
        }

        return query;
    },
    getOne(movieId) {
        return Movie.findById(movieId);
    },
    getOneDetailed(movieId) {
        return this.getOne(movieId).populate('casts');
    },
    create(movieData, userId) {
        return Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            creator: userId,
        });
    },
    async attach(movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    }
}
