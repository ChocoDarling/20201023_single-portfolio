let hashtagTemplate;

function loginBtn(e) {
    stopParentEvent(e);
    onHashtag(false);
    const tempElemClass = document.getElementById('login-box').classList;
    const tempElemBtn = document.getElementById('login-top-btn');
    console.log(tempElemBtn.getElementsByTagName('path'));
    if (tempElemClass.contains('on')) {
        tempElemClass.remove('on');
    } else {
        tempElemClass.add('on');
    }
}

function stopParentEvent(e) {
    e.stopPropagation();
    e.preventDefault();
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

function clickHashtag(e, searchKey) {
    stopParentEvent(e);
    const tempForm = document.createElement('form');
    tempForm.style.display = 'none';
    tempForm.method = 'POST';
    tempForm.action = '/';
    const tempInputSearch = document.createElement('input');
    tempInputSearch.value = searchKey;
    tempInputSearch.name = 'searchKey';
    tempForm.appendChild(tempInputSearch);
    document.body.appendChild(tempForm);
    tempForm.submit();
}

function outLogin() {
    if (innerWidth > 1366) return;
    onHashtag(false);
    if (!document.getElementById('login-box')) return;
    const tempElemClass = document.getElementById('login-box').classList;
    const tempElemBtn = document.getElementById('login-top-btn');
    tempElemClass.remove('on');
}

function joinBtn() {
    location.href += 'join';
}

function isblur() {
    const textArea = document.getElementById('sale-information');
    if (textArea.innerHTML === '<p><br></p>') textArea.innerHTML = '';
}

function isDivEmpty() {
    const textArea = document.getElementById('sale-information');
    if (textArea.childElementCount < 2 &&
        (textArea.innerHTML === '' || 
        textArea.firstElementChild.localName === 'br')
    ) {
        textArea.innerHTML = '<p><br></p>';
    } else if (textArea.getElementsByClassName('first').length > 1) {
        if (textArea.firstElementChild.innerHTML === '') {
            textArea.firstElementChild.innerHTML = '<br>';
        }
    }
}

function checkHashtag(e) {
    if (!document.getElementById('sale-information').innerHTML.includes('#'))return;
    let tempText = document.getElementById('sale-information').cloneNode(true).innerHTML.replace(/<\/|>/g, ' ');
    let tempArr = tempText.match(/\S*#/g);
    while (tempArr) {
        tempArr.forEach(v => {
            tempText = tempText.replace(v, `${v.slice(0, -1)} #`);
        });
        tempArr = tempText.match(/\S+#/g);
    }
    const hashtags = new Set((`${tempText} `).match(/#\S*/g));
    if(hashtags.size > 9) {
        alert('해시태그는 10개까지 입니다.');
        e.preventDefault();
    }
    document.getElementById('sale-hashtag').value = [...hashtags].join(' ');
}

function getImgs(imgArr) {
    const tempImgArr = new Set();

    [...imgArr].forEach(v => {
        if (v.src.includes(';')) {
            const tempImgObj = {};
            const tempArr = v.src.split(';');
            tempImgObj.ext = `${(tempArr[0].split('/'))[1]}`;
            tempImgObj.data = (tempArr[1].split(','))[1];
            tempImgObj.oldsrc = v.src;
            tempImgArr.add(JSON.stringify(tempImgObj));
        }
    });
    return [...tempImgArr].map(v => {
        const tempObj = JSON.parse(v);
        tempObj.src = `/imgs/sales/${Date.now()}.${tempObj.ext}`;
        return tempObj;
    });
}

function setImgs(imgArr) {
    imgArr.forEach(v => {
        axios.post(
            `/imgs/add`, 
            { headers: { 
                'Content-type': 'application/x-www-form-urlencoded', 
            }, 
            src : v.src, 
            img: v.data
        })
            .then( res => {
                v[2].src = res.data;
                v[2].alt = '';
            });
    })

    // if (imgs.size) return [...imgs].map(v => {
    //     if (v) {
    //         axios.post(
    //             `/imgs/add`, 
    //             { headers: { 
    //                 'Content-type': 'application/x-www-form-urlencoded', 
    //             }, 
    //             ext : v[0], 
    //             img: v[1] 
    //         })
    //             .then( res => {
    //                 v[2].src = res.data;
    //                 v[2].alt = '';
    //             });
    //     }

    //     console.log(v);
    //     const tempForm = document.createElement('form');
    //     tempForm.method = 'POST';
    //     tempForm.action = '/imgs/add';
    //     const tempName = document.createElement('input');
    //     tempName.name = 'ext';
    //     tempName.value = v[0];
    //     const tempImg = document.createElement('input');
    //     tempImg.name = 'img';
    //     tempImg.value = v[1];
    //     tempForm.appendChild(tempName);
    //     tempForm.appendChild(tempImg);
    //     document.body.appendChild(tempForm);
    //     console.log(tempForm);
    //     tempForm.submit();
    // });
    // if (imgs.size) return imgs;
    // return;

    
    // const tempArr = req.body.imgs.split(',').map(m => {
    //     return m.split(' ');
    // });
    // tempArr.forEach(v => {
    //     const tempName = Date.now();
    //     console.log(__dirname);
    //     fs.writeFileSync(path.join(__dirname, `../imgs/${tempName}${v[0]}`), v[1], 'base64');
    //     req.body.information.match(/src=".*"/g).forEach(m => {
    //         req.body.information = req.body.information.replace(m, `src="/imgs/${tempName}${v[0]}"`);
    //     })
    // })
}

function onSubmit(e) {
    checkHashtag(e);
    const datas = document.getElementById('sale-information');
    const imgs = datas.getElementsByTagName('img');
    const imgDatas = getImgs(imgs);
    const formData = document.getElementById('sale-box');
    const tempInput = document.createElement('input');

    setImgs(imgDatas);
    imgDatas.forEach(v => {
        [...imgs].forEach(elem => {
            if (elem.src === v.oldsrc) {
                elem.src = v.src;
                elem.alt = '';
            }
        })
    });
    tempInput.style.display = 'none';
    tempInput.name = 'information';
    tempInput.value = datas.innerHTML;
    formData.appendChild(tempInput);
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
