const router = require('express').Router();
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { Sale, Hashtag } = require('../models');

router.post('/add', isLoggedIn, async (req, res) => {
    const sale = await Sale.create({
        name : req.body.name,
        count : req.body.count,
        price : req.body.price,
        information : req.body.information,
    });
    if (req.body.hashtags) {
        req.body.hashtags.split(' ').forEach(async v => {
            let hashtag = await Hashtag.findOne({
                where : { name : v },
            });
            if (!hashtag) {
                hashtag = await Hashtag.create({
                    name : v,
                });
            }
            await hashtag.addSale(sale.id);
        })
    }
    sale.setUser(parseInt(req.user.id, 10));

    res.redirect('/');
});

router.get('/del/:id', isLoggedIn, async (req, res) => {
    try {
        await Sale.destroy({ where : { id : parseInt(req.params.id, 10) } });
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/', isLoggedIn, (req, res) => {
    res.render('sale');
});

module.exports = router;
