const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const User = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, password, passwordCheck, nick, name, phoneNumber } = req.body;
    try {
        const exUser = await User.findOne({ where : { email } });
        if (exUser) return res.redirect('/join?joinError=idexist');
        if (password !== passwordCheck) return res.redirect('/join?joinError=passwordDif');
        const hash = await bcrypt.hash(password, 12);   // 암호화 / 31까지 사용할 수 있으며 12 이상을 권장. promise 지원
        await User.create({
            email,
            password : hash,
            nick,
            name,
            phoneNumber,
        });
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) return res.redirect(`/?loginError=${info.message}`);
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect : '/',
}), (req, res) => {
    res.redirect('/');
});

module.exports = router;