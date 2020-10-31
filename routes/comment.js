const { Buffer } = require('buffer');
const path = require('path');
const fs = require('fs').promises;
const { Comment, User } = require('../models');
const { isLoggedIn } = require('./middleware');
const router = require('express').Router();

router.post('/add', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({ where : { id : req.user.id } })
        
        let imgs1 = req.body.comment.indexOf(',') + 1;
        let imgs2 = imgs1 + req.body.comment.slice(imgs1).indexOf('" alt');
        const img = req.body.comment.slice(imgs1, imgs2);
        
        console.log('====================================================');
        console.log(Date.now());
        fs.writeFile(path.join(__dirname, '../imgs', Date.now()+'.jpg'), img, 'base64');    // 이미지 저장
        // const comment = await Comment.create({
        //     content : req.body.comment,
        //     score : 0,
        // });
        // user.addComment(comment.id);
        res.redirect('/sale');
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.get('/del/:id', isLoggedIn, async (req, res, next) => {
    try {
        await Comment.destroy({ where : { id : parseInt(req.params.id, 10) } })
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;