import express from 'express';
import { google, signOut, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);//for signup
router.post("/signin", signin);//for sign In
router.post('/google', google); // for google sign in
router.get('/signout', signOut)// for sign out

export default router;