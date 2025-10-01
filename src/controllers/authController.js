import { Router } from "express";

const authController = Router();

authController.get('/', (req, res) => {
    res.send('It works'); 
});

export default authController;
