function loginBtn(e) {
    stopParentEvent(e);
    const tempElemClass = document.getElementById('login-box').classList;
    const tempElemBtn = document.getElementById('login-btn-top');
    if (tempElemClass.contains('on')) {
        tempElemBtn.innerHTML = 'Login';
        tempElemClass.remove('on');
    } else {
        tempElemBtn.innerHTML = 'Cancle';
        tempElemClass.add('on');
    }
}

function stopParentEvent(e) {
    e.stopPropagation();
}

function onHashtag(isFocus) {
    if (innerWidth > 1366) return;
    const tempElemClass = document.getElementById('hashtag-list').classList;
    if (isFocus) {
        tempElemClass.add('on');
    } else {
        tempElemClass.remove('on');
    }
}

function outLogin() {
    if (innerWidth > 1366) return;
    if (!document.getElementById('login-box')) return;
    const tempElemClass = document.getElementById('login-box').classList;
    const tempElemBtn = document.getElementById('login-btn-top');
    tempElemBtn.innerHTML = 'Login';
    tempElemClass.remove('on');
}

function joinBtn() {
    location.href += 'join';
}

window.onload = () => {
    let tempParam = new URL(location.href).searchParams.get('joinError');
    switch (tempParam) {
        case 'idexist':
            alert('이미 존재하는 이메일입니다.');
            break;
    
        case 'passwordDif':
            alert('비밀번호를 확인해주세요.');
            break;
    
        default:
            if(new URL(location.href).searchParams.get('loginError'))
                alert(new URL(location.href).searchParams.get('loginError'));
            break;
    }
};