import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    // TODO Prepare view data (temp solution)
    const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

    res.render('details', { movie, rating: ratingViewData });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll();

    console.log(casts);

    res.render('casts/attach', { movie, casts });
});

export default movieController;
