const path = require("path");
const fs = require("fs").promises;
const { Comment, Sale, Purchase } = require("../models");
const { isLoggedIn } = require("./middleware");
const router = require("express").Router();

router.post("/add/:id", isLoggedIn, async (req, res, next) => {
  try {
    const sale = await Sale.findOne({ where: { id: req.params.id } });
    // let imgs1 = req.body.comment.indexOf(',') + 1;
    // let imgs2 = imgs1 + req.body.comment.slice(imgs1).indexOf('" alt');
    // const img = req.body.comment.slice(imgs1, imgs2);

    // console.log('====================================================');
    // console.log(Date.now());
    // fs.writeFile(path.join(__dirname, '../imgs', Date.now()+'.jpg'), img, 'base64');    // 이미지 저장
    const comment = await Comment.create({
      userName: req.user.name,
      content: req.body.content,
      score: req.body.score,
    });
    comment.setUser(req.user.id);
    comment.setSale(req.params.id);
    await Purchase.update(
      {
        CommentId: comment.id,
      },
      {
        where: { id: req.body.purchaseId },
      }
    );

    res.redirect(`/product/${sale.id}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/del/:id", isLoggedIn, async (req, res, next) => {
  try {
    await Purchase.update(
      {
        CommentId: 0,
      },
      {
        where: { CommentId: req.params.id },
      }
    );
    await Comment.destroy({ where: { id: parseInt(req.params.id, 10) } });
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
