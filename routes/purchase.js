const router = require("express").Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const { Sale, Purchase, sequelize } = require("../models");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const query = req.query;
    if (query.where) {
      const tempArr = query.where;
      query.where = {};
      query.where[tempArr[0]] = tempArr[1];
    } else {
      res.redirect("/profile");
    }
    if (query.whatItems) {
      if (query.whatItems === "new") {
        query.order = [[sequelize.col("id"), "DESC"]];
      }
      if (query.whatItems === "popular") {
        query.order = [[sequelize.col("score"), "DESC"]];
      }
      query.whatItems = "";
    }
    if (query.limit) query.limit = parseInt(query.limit);
    let Sales = await Purchase.findAll(query);
    res.send(Sales);
  } catch (error) {
    next(error);
  }
});

router.post("/add/:id", isLoggedIn, async (req, res, next) => {
  try {
    if (req.body.count === 0) return;
    const sale = await Sale.findOne({ where: { id: req.params.id } });
    const purchase = await Purchase.create({
      name: sale.name,
      mainImg: sale.mainImg,
      userName: req.user.name,
      saleCount: req.body.count,
      price: sale.price * req.body.count,
    });
    await purchase.setUser(req.user.id);
    await sale.addPurchases(purchase.id);
    await Sale.update(
      {
        saleCount: +sale.saleCount - +req.body.count,
      },
      {
        where: { id: sale.id },
      }
    );

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/del/:id", isLoggedIn, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ where: { id: req.params.id } });
    const sale = await purchase.getSale();
    await Sale.update(
      {
        saleCount: +sale.saleCount - +purchase.count,
      },
      {
        where: { id: sale.id },
      }
    );
    await Purchase.destroy({ where: { id: parseInt(req.params.id, 10) } });
    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
