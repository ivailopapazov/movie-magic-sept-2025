import { Router } from "express";

const movieController = Router();

movieController.get('/movies/create', (req, res) => {
    res.send('Movie Create');     
});

export default movieController;
