const router = require('express').Router();
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const { Sale, Purchase } = require('../models');

router.get('/', isLoggedIn, (req, res) => {
    res.redirect('/');
});

router.post('/add/:id', isLoggedIn, async (req, res, next) => {
    try {
        const sale = await Sale.findOne({ where : { id : req.params.id } });
        const purchase = await Purchase.create({
            userName : req.user.name,
            count : req.body.count,
            price : sale.price * req.body.count,
        });
        await purchase.setUser(req.user.id);
        await sale.addPurchases(purchase.id);
        await Sale.update({
            saleCount : +sale.saleCount + +req.body.count,
        }, {
            where : { id : sale.id },
        });
    
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/del/:id', isLoggedIn, async (req, res) => {
    try {
        const purchase = await Purchase.findOne({ where : { id : req.params.id } });
        const sale = await purchase.getSale();
        await Sale.update({
            saleCount : +sale.saleCount - +purchase.count,
        }, {
            where : { id : sale.id },
        });
        await Purchase.destroy({ where : { id : parseInt(req.params.id, 10) } });
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;