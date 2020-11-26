const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const { Sale, User, Hashtag } = require("../models");

router.use(async (req, res, next) => {
  res.locals.user = req.user;
  res.locals.hashtagLists = [];
  res.locals.hashtagLists.push({
    name: "최근 해시태그",
    list: (await Hashtag.findAll({})).reverse().slice(0, 10),
  });
  res.locals.advertiseList = [
    {
      href: "",
      img: "/imgs/need_advertise.png",
    },
  ];
  next();
});

router
  .route("/")
  .get((req, res) => {
    res.render("main", {
      title: "테스트",
    });
  })
  .post(async (req, res) => {
    const hashtag = await Hashtag.findOne({
      where: { name: req.body.searchKey },
    });
    const Sales = await hashtag.getSales();
    res.render("main", {
      Sales,
    });
  });

router.post("/hashtag", async (req, res) => {
  const hashtag = await Hashtag.findOne({
    where: { name: req.body.searchKey },
  });
  const Sales = await hashtag.getSales();
  console.log(Sales);
  res.send(Sales);
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join");
});

router.get("/information", isNotLoggedIn, (req, res) => {
  res.render("information");
});

router.get("/profile", isLoggedIn, async (req, res) => {
  res.locals.user.Sales = await res.locals.user.getSales();
  res.locals.user.SalesFull = 0;
  for (let i = 0; i < res.locals.user.Sales.length; i++) {
    res.locals.user.Sales[i].User = await res.locals.user.Sales[i].getUser();
    res.locals.user.SalesFull +=
      res.locals.user.Sales[i].saleCount * res.locals.user.Sales[i].price;
  }
  res.locals.user.Purchases = await res.locals.user.getPurchases();
  res.locals.user.PurchasesFull = 0;
  for (let i = 0; i < res.locals.user.Purchases.length; i++) {
    res.locals.user.Purchases[i].User = await res.locals.user.Purchases[
      i
    ].getUser();
    res.locals.user.Purchases[i].Sale = await res.locals.user.Purchases[
      i
    ].getSale();
    res.locals.user.PurchasesFull += +res.locals.user.Purchases[i].price;
  }
  res.locals.user.Comments = await res.locals.user.getComments();
  for (let i = 0; i < res.locals.user.Comments.length; i++) {
    res.locals.user.Comments[i].Sale = await res.locals.user.Comments[
      i
    ].getSale();
  }
  res.locals.user.SalesComments = [];
  for (let i = 0; i < res.locals.user.Sales.length; i++) {
    res.locals.user.SalesComments = res.locals.user.SalesComments.concat(
      await res.locals.user.Sales[i].getComments()
    );
  }
  res.locals.user.score =
    res.locals.user.SalesComments.length > 0
      ? parseInt(
          (res.locals.user.SalesComments.map((e) => +e.score).reduce(
            (acc, cur) => acc + cur
          ) /
            res.locals.user.SalesComments.length) *
            100
        )
      : 0;

  await User.update(
    {
      score: res.locals.user.score,
    },
    {
      where: { id: res.locals.user.id },
    }
  );
  res.render("profile");
});

router.get("/product/:id", async (req, res) => {
  const product = await Sale.findOne({ where: { id: req.params.id } });
  product.Comments = await product.getComments();
  product.saleUser = await User.findOne({ where: { id: product.UserId } });
  product.hashtags = await product.getHashtags();
  if (res.locals.user) {
    res.locals.user.Purchases = await res.locals.user.getPurchases();
  }
  res.render("product", {
    product,
  });
});

router.get(/\/imgs\/\S*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../", req.url));
});

router.post("/imgs/add", (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, "../", req.body.src),
    req.body.img,
    "base64"
  );
});

module.exports = router;
