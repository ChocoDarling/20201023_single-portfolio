function errorCheck() {
  const params = new URLSearchParams(location.search);
  if (params.has("err")) {
    alert(params.get("message"));
    location.href = "/";
  }
}

function isBox(e, isOn) {
  e.stopPropagation();
  //   e.preventDefault();
  if (isOn) {
    document.querySelector(
      `.${e.target.parentElement.classList[0]}.box`
    ).style.display = "flex";
  } else {
    document
      .querySelectorAll(`.box`)
      .forEach((v) => (v.style.display = "none"));
    [...document.getElementsByTagName("input")].forEach((elem) => {
      elem.value = "";
    });
  }
  // document.getElementsByClassName("login-box")[0].classList.;
}

function preventDefault(e) {
  e.preventDefault();
}

function stopPropagation(e) {
  e.stopPropagation();
}
// e.preventDefault();
// e.stopPropagation();

function onTextChange(name, isChange) {
  if (isChange) {
    document.getElementsByClassName(name)[0].style.display = "none";
    document.getElementsByClassName(`${name}-change`)[0].style.display = "flex";
  } else {
    document.getElementsByClassName(name)[0].style.display = "flex";
    document.getElementsByClassName(`${name}-change`)[0].style.display = "none";
  }
}

function getTemplate(name) {
  return document
    .getElementById("template")
    .getElementsByClassName(name)[0]
    .cloneNode(true);
}

function onDataListClick(e) {
  e.target.parentElement.getElementsByClassName("on")[0].classList.remove("on");
  e.target.classList.add("on");
  document.querySelector(".data-input").innerHTML = "";
  if (e.target.classList.contains("user-sale"))
    findData(document.querySelector(".user-information").id, "/item");
  if (e.target.classList.contains("user-purchase"))
    findData(document.querySelector(".user-information").id, "/purchase");
}

function onDataListClickOfOn(e) {
  [...document.querySelectorAll(".on")].forEach((v) => {
    v.classList.remove("on");
  });
  [...document.querySelectorAll(`.${e.target.classList[0]}`)].forEach((v) => {
    v.classList.add("on");
  });
}

async function findData(id, href) {
  try {
    const sales = (
      await axios.get(href, {
        params: { where: ["UserId", id], whatItems: "new" },
      })
    ).data;
    sales.forEach((v) => {
      const tempElem = getTemplate("item-list");
      tempElem.removeAttribute("id");
      if (href === "/item")
        tempElem.getElementsByTagName("a")[0].href = `/product/${v.id}`;
      if (href === "/purchase")
        tempElem.getElementsByTagName("a")[0].href = `/product/${v.SaleId}`;
      tempElem.getElementsByClassName(
        "item-img"
      )[0].style.backgroundImage = `url(${v.mainImg})`;
      tempElem.getElementsByClassName("item-name")[0].innerText = v.name;
      tempElem.getElementsByClassName(
        "item-price"
      )[0].firstChild.innerText = parseInt(v.price).toLocaleString();
      tempElem.getElementsByClassName(
        "item-price"
      )[0].innerHTML += `/ ${v.saleCount}개`;
      document.querySelector(".data-input").appendChild(tempElem);
    });
  } catch (error) {
    console.log(error);
  }
}

async function checkPassword(e) {
  try {
    const tempPwd = document
      .querySelector(".join.box")
      .querySelectorAll("input[type=password]");
    if (tempPwd[0].value !== tempPwd[1].value) {
      preventDefault(e);
      stopPropagation(e);
      alert("비밀번호를 확인해주세요.");
    }
  } catch (error) {}
}

// let hashtagTemplate;

// function loginBtn(e) {
//     stopParentEvent(e);
//     onHashtag(false);
//     const tempElemClass = document.getElementById('login-box').classList;
//     const tempElemBtn = document.getElementById('login-top-btn');
//     console.log(tempElemBtn.getElementsByTagName('path'));
//     if (tempElemClass.contains('on')) {
//         tempElemClass.remove('on');
//     } else {
//         tempElemClass.add('on');
//     }
// }

// function stopParentEvent(e) {
//     e.stopPropagation();
//     e.preventDefault();
// }

// function onHashtag(isFocus) {
//     if (innerWidth > 1366) return;
//     const tempElemClass = document.getElementById('hashtag-list').classList;
//     if (isFocus) {
//         tempElemClass.add('on');
//     } else {
//         tempElemClass.remove('on');
//     }
// }

async function clickHashtag(e, searchKey) {
  try {
    const parentElem = document.getElementById("hashtag-items");
    const sales = (
      await axios.post("/", {
        searchKey,
      })
    ).data;
    console.log(sales);
    sales.forEach((v) => {
      const tempElem = getTemplate("item-list");
      tempElem.removeAttribute("id");
      tempElem.getElementsByTagName("a")[0].href = `/product/${v.id}`;
      tempElem.getElementsByClassName(
        "item-img"
      )[0].style.backgroundImage = `url(${v.mainImg})`;
      tempElem.getElementsByClassName("item-name")[0].innerText = v.name;
      tempElem.getElementsByClassName(
        "item-price"
      )[0].firstChild.innerText = parseInt(v.price).toLocaleString();
      parentElem.appendChild(tempElem);
    });
  } catch (error) {}
  // const tempForm = document.createElement('form');
  // tempForm.style.display = 'none';
  // tempForm.method = 'POST';
  // tempForm.action = '/';
  // const tempInputSearch = document.createElement('input');
  // tempInputSearch.value = searchKey;
  // tempInputSearch.name = 'searchKey';
  // tempForm.appendChild(tempInputSearch);
  // document.body.appendChild(tempForm);
  // tempForm.submit();
}

// function outLogin() {
//     if (innerWidth > 1366) return;
//     onHashtag(false);
//     if (!document.getElementById('login-box')) return;
//     const tempElemClass = document.getElementById('login-box').classList;
//     const tempElemBtn = document.getElementById('login-top-btn');
//     tempElemClass.remove('on');
// }

// function joinBtn() {
//     location.href += 'join';
// }

function isblur() {
  const textArea = document.getElementById("sale-information");
  if (textArea.innerHTML === "<p><br></p>") textArea.innerHTML = "";
}

function isDivEmpty() {
  const textArea = document.getElementById("sale-information");
  if (
    textArea.childElementCount < 2 &&
    (textArea.innerHTML === "" || textArea.firstElementChild.localName === "br")
  ) {
    textArea.innerHTML = "<p><br></p>";
  } else if (textArea.getElementsByClassName("first").length > 1) {
    if (textArea.firstElementChild.innerHTML === "") {
      textArea.firstElementChild.innerHTML = "<br>";
    }
  }
}

function checkHashtag(e) {
  if (!document.getElementById("sale-information").innerHTML.includes("#"))
    return;
  let tempText = document
    .getElementById("sale-information")
    .cloneNode(true)
    .innerHTML.replace(/<\/|>/g, " ");
  let tempArr = tempText.match(/\S*#/g);
  while (tempArr) {
    tempArr.forEach((v) => {
      tempText = tempText.replace(v, `${v.slice(0, -1)} #`);
    });
    tempArr = tempText.match(/\S+#/g);
  }
  const hashtags = new Set(`${tempText} `.match(/#\S*/g));
  if (hashtags.size > 9) {
    alert("해시태그는 10개까지 입니다.");
    e.preventDefault();
  }
  document.getElementById("sale-hashtag").value = [...hashtags].join(" ");
}

function getImgs(imgArr) {
  const tempImgArr = new Set();

  [...imgArr].forEach((v) => {
    if (v.src.includes(";")) {
      const tempImgObj = {};
      const tempArr = v.src.split(";");
      tempImgObj.ext = `${tempArr[0].split("/")[1]}`;
      tempImgObj.data = tempArr[1].split(",")[1];
      tempImgObj.oldsrc = v.src;
      tempImgArr.add(JSON.stringify(tempImgObj));
    }
  });
  return [...tempImgArr].map((v) => {
    const tempObj = JSON.parse(v);
    tempObj.src = `/imgs/sales/${Date.now()}.${tempObj.ext}`;
    return tempObj;
  });
}

function setImgs(imgArr) {
  imgArr.forEach((v) => {
    axios
      .post(`/imgs/add`, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        src: v.src,
        img: v.data,
      })
      .then((res) => {
        v[2].src = res.data;
        v[2].alt = "";
      });
  });
}

function onSubmit(e) {
  checkHashtag(e);
  const datas = document.getElementById("sale-information");
  const imgs = datas.getElementsByTagName("img");
  const imgDatas = getImgs(imgs);
  const formData = document.getElementById("sale-box");
  const tempInput = document.createElement("input");
  const tempImg = document.createElement("input");
  setImgs(imgDatas);
  imgDatas.forEach((v) => {
    [...imgs].forEach((elem) => {
      if (elem.src === v.oldsrc) {
        elem.src = v.src;
        elem.alt = "";
      }
    });
  });
  tempInput.style.display = "none";
  tempInput.name = "information";
  tempInput.value = datas.innerHTML;
  tempImg.style.display = "none";
  tempImg.name = "mainImg";
  tempImg.value = "";
  if (imgs.length) {
    tempImg.value = datas.getElementsByTagName("img")[0].getAttribute("src");
  }
  formData.appendChild(tempInput);
  formData.appendChild(tempImg);
}

function makeTempItems(parent) {
  const v = document.getElementById(parent);
  for (let i = 0; i < 5; i++) {
    if (v.children.length - 1 > i) continue;
    const tempElem = getTemplate("item-list");
    tempElem.removeAttribute("id");
    tempElem.getElementsByTagName("a")[0].href = ``;
    tempElem.getElementsByClassName("item-img")[0];
    tempElem.getElementsByClassName(
      "item-name"
    )[0].innerText = `${v.children[0].innerHTML} 실험중`;
    tempElem.getElementsByClassName("item-price")[0].firstChild.innerText =
      "1000";
    v.appendChild(tempElem);
  }
}
async function makeItems(whatItems, parent) {
  const parentElem = document.getElementById(parent);
  if (!parentElem) return;
  try {
    const params = {
      limit: 5,
      whatItems: whatItems,
    };
    const Sales = (await axios.get("/item", { params })).data;

    Sales.forEach((v) => {
      const tempElem = getTemplate("item-list");
      tempElem.removeAttribute("id");
      tempElem.getElementsByTagName("a")[0].href = `/product/${v.id}`;
      tempElem.getElementsByClassName(
        "item-img"
      )[0].style.backgroundImage = `url(${v.mainImg})`;
      tempElem.getElementsByClassName("item-name")[0].innerText = v.name;
      tempElem.getElementsByClassName(
        "item-price"
      )[0].firstChild.innerText = parseInt(v.price).toLocaleString();
      parentElem.appendChild(tempElem);
    });
  } catch (error) {}
  makeTempItems(parent);
}
window.onload = () => {
  errorCheck();
  makeItems("new", "last-item-list");
  makeItems("popular", "popular-item-list");
  if (document.querySelector(".data-input")) {
    const tempDate = new Date(document.querySelector(".date-join").innerHTML);
    document.querySelector(".date-join").innerHTML = moment(tempDate).format(
      "LLLL"
    );
    findData(document.querySelector(".user-information").id, "/item");
  }
};
// window.onload = () => {
//     let tempParam = new URL(location.href).searchParams.get('joinError');
//     switch (tempParam) {
//         case 'idexist':
//             alert('이미 존재하는 이메일입니다.');
//             break;

//         case 'passwordDif':
//             alert('비밀번호를 확인해주세요.');
//             break;

//         default:
//             if(new URL(location.href).searchParams.get('loginError'))
//                 alert(new URL(location.href).searchParams.get('loginError'));
//             break;
//     }
// };
