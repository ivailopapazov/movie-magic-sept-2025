import { Router } from "express";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('casts/create');
});

export default castController;
