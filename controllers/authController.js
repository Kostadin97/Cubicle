const { Router } = require('express');
const authService = require('../services/authService');
const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { message: 'Passwords must be the same!' });
    }

    try {
        let user = await authService.register({username, password});
        
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { title: 'Register Page', error });
    }
});

module.exports = router;