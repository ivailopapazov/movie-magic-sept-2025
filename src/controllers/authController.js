import { Router } from "express";
import userService from "../services/userService.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register'); 
});

authController.post('/register', async (req, res) => {
    const userData = req.body; 

    await userService.register(userData);

    res.redirect('/');
});

export default authController;
