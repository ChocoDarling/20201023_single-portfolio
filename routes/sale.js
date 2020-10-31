const router = require('express').Router();
const path = require('path');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');

router.use(async (req, res, next) => {
    res.locals.user = req.user;
    res.locals.hashtagLists = [];
    res.locals.advertiseList = [];
    res.locals.productList = [];
    console.log(req.user ? await req.user.Comments : '');
    next();
});

router.post('/product', isLoggedIn, (req, res) => {
    console.log('req.body : =====================================================================');
    console.log(req.body.comment);
    console.log(req.body);
    console.log(res.locals.user.id);
    
    res.redirect('/sale');
});

router.get('/', isLoggedIn, (req, res) => {
    res.render('sale-temp');
});

module.exports = router;
