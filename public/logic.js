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

function onLogin(isLogin) {
    if (innerWidth > 1366) return;
    const tempElemClass = document.getElementById('login-box').classList;
    if (isLogin) {
        tempElemClass.add('on');
    } else {
        tempElemClass.remove('on');
    }
}