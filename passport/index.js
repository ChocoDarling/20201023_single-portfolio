const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {    // 로그인 할때만 실행된다. 사용자 정보 객체를 session에 저장
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {    // 매 요청마다 실행. 세션에 저장한 아이디를 통해서 사용자 정보 객체를 불러옴
        User.findOne({ 
            where : { id },
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};