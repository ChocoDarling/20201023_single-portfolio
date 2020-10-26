const db = {
    users = {
        email : '이메일',
        password : '비밀번호',
        name : '이름',
        residentRegistrationNumber : '주민등록번호',
        phoneNumber : '전화번호',
        address : '주소',
        license : '사업자 등록 번호',
        score : '평균점수',         // << (sale >> comments.sale >> ) / comments.scores.length
        sale : '판매제품',          // << sales
        totalIncome : '총 수입',
        purchase : '구매제품',      // << purchases
        totalExpenditure : '총 지출',
        comments : '댓글',          // << comments
    },

    comments = {
        user : '유저',      // << users.id
        text : '내용',
        score : '점수',     // >> sales.user >> users.score
        sale : '제품',      // << sales.id
    },
    
    sales = {
        user : '유저',          // << users 판매자
        count : '갯수',
        price : '가격',
        information : '정보',
        images : '이미지',
    },
    
    purchases = {
        user : '유저',          // << users 구입자
        count : '총 갯수',
        price : '총 가격',      // << 갯수 * purchases
        purchase : '산 제품',   // << sales
    },
    
    /**
     * 찜하기는 유저 또는 제품을 할 수 있으며
     * 사용 시 제품 값이 없으면 markingUser를 출력
     */
    favorites = {
        user : '유저',          // << users 찜하기 표시한 유저
        liked : {
            table : '선택한 테이블',
            id : '선택한 id',
        },
    },
    
    hashtag = {
        name : '태그 내용',
        countFound : '찾아진 횟수',
        countLooked : '사용된 횟수',
        createdAt : '생성된 시간',     // >> users
    },

    //hashtag가 사용된 db는 일정 시간 후에 삭제한다.

    hashtagFind = {
        hashtag : '태그id',
        user : '유저',              // 찾은 유저
        foundAt : '찾은 시간',      // >> users
    },
    
    hashtagLook = {
        hashtag : '태그id',
        user : '유저',                          // >> 본 유저
        lookedAt : '사이트 출력에 사용된 시간',   // >> users
    },
    
};

const html = {
    main : {
        // 기본적인 layout 포함
    },

    user : {
        // 유저 정보
    },

    sale : {
        // 제품 정보
    },

    list : {
        // 제품 목록
    },

    saler : {
        // 판매자 정보
    }
};