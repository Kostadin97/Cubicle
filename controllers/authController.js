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
    const passwordMessage = 'Passwords must be the same!';

    if (password !== repeatPassword) {
        return res.render('register', { error: passwordMessage });
    }

    try {
        let user = await authService.register({username, password});
        
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { title: 'Register Page', error: passwordMessage });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie('USER_SESSION', token);
        res.redirect('/');
        
    } catch (error) {
        res.render('login', {error});
    }

});
module.exports = router;