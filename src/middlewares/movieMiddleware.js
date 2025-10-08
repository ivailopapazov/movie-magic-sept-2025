import movieService from "../services/movieService.js";

export async function isMovieCreator(req, res, next) {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login') // TODO Add message
    }
    
    // Validate if user is creator
    if (movie.creator !== req.user.id) {
        return res.status(401).render('404', { error: 'Only creator can edit this movie!' });
    }

    req.movie = movie;
    
    next();
}
