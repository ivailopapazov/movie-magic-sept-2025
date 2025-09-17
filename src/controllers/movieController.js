import { Router } from "express";

const movieController = Router();

movieController.get('/movies/create', (req, res) => {
    res.render('create');
});

export default movieController;
