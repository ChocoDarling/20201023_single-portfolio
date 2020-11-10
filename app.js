const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const passport = require('passport');

dotenv.config();
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const saleRouter = require('./routes/sale');
const purchaseRouter = require('./routes/purchase');
const commentRouter = require('./routes/comment');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const app = express();
passportConfig();

app.set('port', process.env.PORT || 80);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force : true })
    .then(() => {
        console.log('데이터 베이스 연결');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/sale', saleRouter);
app.use('/purchase', purchaseRouter);
app.use('/comment', commentRouter);


app.use((req, res, next) => {
    res.redirect('/');
    const err = new Error(`${req.headers.host}${req.url} 페이지가 존제하지 않습니다.`);
    err.status = 404;
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : { };
    res.status(err.status || 500);
    const tempImgs = [
        { name : 'iconmonstr-angel-down-thin', use : '로그인패널버튼' },
        { name : 'iconmonstr-angel-up-thin', use : '로그인패널버튼' },
        { name : 'iconmonstr-arrow-80', use : '로그인패널버튼' },
        { name : 'iconmonstr-arrow-81', use : '로그인패널버튼' },
        { name : 'iconmonstr-id-card-1', use : '회원가입' },
        { name : 'iconmonstr-user-8', use : '회원가입' },
        { name : 'iconmonstr-user-10', use : '회원가입' },
        { name : 'iconmonstr-user-32', use : '회원가입' },
        { name : 'iconmonstr-user-33', use : '회원가입' },
        { name : 'iconmonstr-picture-12', use : '회원가입' },
        { name : 'iconmonstr-user-male-thin', use : '회원가입' },
        { name : 'iconmonstr-log-out-17', use : '로그인' },
        { name : 'iconmonstr-log-out-18', use : '로그아웃' },
        { name : 'iconmonstr-magnifier-6', use : '검색시작' },
        { name : 'iconmonstr-magnifier-12', use : '검색새로고침' },
        { name : 'iconmonstr-archive-13', use : '상품등록' },
        { name : 'iconmonstr-archive-14', use : '상품등록' },
        { name : 'iconmonstr-download-20', use : '상품등록' },
        { name : 'iconmonstr-folder-3', use : '상품등록' },
        { name : 'iconmonstr-pencil-thin', use : '상품등록' },
        { name : 'iconmonstr-trash-can-15', use : '상품삭제' },
        { name : 'iconmonstr-shopping-cart-14', use : '장바구니추가' },
        { name : 'iconmonstr-shopping-cart-16', use : '장바구니삭제' },
        { name : 'iconmonstr-shopping-cart-18', use : '구매결정' },
        { name : 'iconmonstr-slack-3', use : '해시태그' },
        { name : 'iconmonstr-slack-5', use : '해시태그' },
        { name : 'iconmonstr-smiley-8', use : '5점' },
        { name : 'iconmonstr-smiley-7', use : '4점' },
        { name : 'iconmonstr-smiley-2', use : '3점' },
        { name : 'iconmonstr-smiley-6', use : '2점' },
        { name : 'iconmonstr-smiley-4', use : '1점' },
        { name : 'iconmonstr-smiley-22', use : '0점' },
        { name : 'iconmonstr-speech-bubble-34', use : '상품평' },
        { name : 'iconmonstr-speech-bubble-35', use : '상품평' },
        { name : 'iconmonstr-speech-bubble-comment-thin', use : '상품평' },
        { name : 'iconmonstr-speech-bubble-thin', use : '상품평' },
    ];
    res.render('error', { icons : tempImgs });
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});