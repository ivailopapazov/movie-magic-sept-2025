import { Router } from "express";

const castController = Router();

castController.get('/', (req, res) => {
    res.send('Cast page');
});

export default castController;
