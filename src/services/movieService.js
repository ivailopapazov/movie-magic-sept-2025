import Movie from "../models/Movie.js";

export default {
    getAll(filter = {}) {
        let query = Movie.find();
        // const result = await Movie.find(filter).lean();
        // const resultObj = result.map(movie => movie.toObject());

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
            // result = result.find({ year: filter.year })
            query = query.where('year').equals(filter.year);
        }

        return query;
    },
    getOne(movieId) {
        // return Movie.findOne({_id: movieId});
        // return Movie.findById(movieId).populate('casts');
        return Movie.findById(movieId);
    },
    getOneDetailed(movieId) {
        return this.getOne(movieId).populate('casts');
    },
    create(movieData) {
        movieData.rating = Number(movieData.rating);

        // const movie = new Movie(movieData);
        // return movie.save();

        return Movie.create(movieData);
    },
    async attach(movieId, castId) {
        // Add relation method #1
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // return movie.save();

        // Add relation method #2 MongoDB
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    }
}
