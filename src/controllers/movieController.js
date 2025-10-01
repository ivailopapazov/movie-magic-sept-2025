import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    if (req.isAuthenticated) {
        console.log(req.user.email);
    }

    res.render('movies/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    await movieService.create(movieData, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneDetailed(movieId)

    // TODO Prepare view data (temp solution)
    const ratingViewData = '&#x2605;'.repeat(Math.trunc(movie.rating));

    // const isCreator = req.user?.id && movie.creator == req.user.id;
    const isCreator = movie.creator && movie.creator.equals(req.user?.id);

    res.render('movies/details', { movie, rating: ratingViewData, isCreator });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter, pageTitle: 'Search Movies' });
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ excludes: movie.casts });

    res.render('casts/attach', { movie, casts });
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    if (!movie.creator?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    res.render('movies/edit', { movie });
});

export default movieController;
