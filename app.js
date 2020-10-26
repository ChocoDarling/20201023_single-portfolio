const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const indexRouter = require('./routes');
const app = express();

dotenv.config();

app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}));

app.use('/', indexRouter);

app.use((req, res, next) => {
    const err = new Error(`${req.headers.host}${req.url} 페이지가 존제하지 않습니다.`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message).end();
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});