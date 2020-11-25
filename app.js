const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const passport = require("passport");

dotenv.config();
const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const saleRouter = require("./routes/sale");
const itemRouter = require("./routes/item");
const purchaseRouter = require("./routes/purchase");
const commentRouter = require("./routes/comment");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
const app = express();
passportConfig();

app.set("port", process.env.PORT || 80);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use("/sale", saleRouter);
app.use("/purchase", purchaseRouter);
app.use("/comment", commentRouter);

app.use((req, res, next) => {
  res.redirect("/");
  const err = new Error(
    `${req.headers.host}${req.url} 페이지가 존제하지 않습니다.`
  );
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("main");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
