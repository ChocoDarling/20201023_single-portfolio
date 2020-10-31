const router = require('express').Router();
const path = require('path');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

router.use(async (req, res, next) => {
    res.locals.user = req.user;
    res.locals.hashtagLists = [];
    res.locals.advertiseList = [];
    res.locals.productList = [];
    // console.log(req.user ? req.user.Comments = await req.user.getComments() : 0);
    // console.log(req.user ? req.user.Comments : 0);
    next();
});

router.get('/', (req, res) => {
    res.render('main', {
        title : '테스트',
    });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join');
});

router.get('/profile', isLoggedIn, (req, res) => {
    console.log(res.locals.user.Comments);
    res.render('profile');
});

router.get(/\/imgs\/\S*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../', req.url));
});

module.exports = router;
