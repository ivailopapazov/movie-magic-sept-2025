import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Movie title is required!'],
        minLength: [5, 'Title is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title has some invalid characters!'],
    },
    category: {
        type: String,
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
            message: 'Your category is invalid!'
        },
        required: [true, 'Movie category is required!'],
    },
    genre: {
        type: String,
        required: [true, 'Movie genre is required!'],
        minLength: [5, 'Movie genre is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Genre has some invalid characters!'],
    },
    director: {
        type: String,
        required: [true, 'Movie director is required!'],
        minLength: [5, 'Movie director is too short!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Director has some invalid characters!'],
    },
    year: {
        type: Number,
        required: [true, 'Movie year is required!'],
        min: [1900, 'Movie year cannot be less than 1900'],
        max: [2024, 'Movie year cannot be greater than 2024'] // TODO Dynamic year check
    },
    imageUrl: {
        type: String,
        required: [true, 'Movie imageUrl is required!'],
        match: [/^https?:\/\//, 'Image Url is invalid!'],
    },
    rating: {
        type: Number,
        required: [true, 'Movie rating is required'],
        min: [1, 'Rating canot be less than 1'],
        max: [10, 'Rating cannot be more than 10'],
    },
    description: {
        type: String,
        required: [true, 'Movie description is required'],
        minLength: [20, 'Description should be at least 20 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description has some invalid characters!'],
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Movie should have creator!'],
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;
