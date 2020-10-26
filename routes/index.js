const app = require('express')();
const fs = require('fs').promises;
const router = require('express').Router();

app.render = (res, path, before, after) => {
    fs.readFile(path)
        .then((data) => {
            data = data.toString();
            console.log(getElem('body', data));
            console.log(getElem('div', data));
            getElenemtsByTag('div', data).forEach(v => console.log(v));
            console.log(getElenemtsByTag('div', data).length);
            res.send(data.replace(before, after));
        });
};

router.get('/', (req, res) => {
    app.render(res, './views/error.html', '이거', '진짜');
});

module.exports = router;

function getElem(tag, str, startIndex = 0) {
    const tempElem = {};
    
    str = str.replace(/\s*\r\n\s*/g, '').replace(/\s*=\s*/g, '=');
    tempElem['tag'] = tag;
    tempElem['startIndex'] = findStartIndex(str, tempElem.tag, startIndex);
    tempElem['endIndex'] = findEndIndex(str, tempElem.startIndex, tempElem.tag);
    tempElem['openTag'] = str.substr(tempElem.startIndex, str.slice(tempElem.startIndex).indexOf('>') + 1);
    tempElem['outerHTML'] = str.slice(tempElem.startIndex, tempElem.endIndex);
    tempElem['innerHTML'] = tempElem.outerHTML.slice(
        tempElem.outerHTML.indexOf('>') + 1, 
        tempElem.outerHTML.length - `</${tempElem.tag}>`.length
    );
    if (tempElem.startIndex === -1) return;
    return tempElem;
}

function findStartIndex(str, tag, startIndex = 0) {
    return startIndex + str.slice(startIndex).indexOf(`<${tag}`);
}

function findEndIndex(str, startIndex, tag) {
    let tempStr = str.slice(startIndex + tag.length + 1);
    let fullLength = tag.length + 1;
    let count = 1;

    if (tempStr.indexOf(`/${tag}>`) < 0) return -1;
    while(count) {
        const tempStart = findStartIndex(tempStr, tag);
        const tempEnd = tempStr.indexOf(`/${tag}>`);
        if (tempStart > 0 && tempStart < tempEnd) {
            count++;
            tempStr = tempStr.slice(tempStart + tag.length + 1);
            fullLength += tempStart + tag.length + 1;
        } else {
            count--;
            tempStr = tempStr.slice(tempEnd + 1);
            fullLength += tempEnd + 1;
        }
    }

    return startIndex + fullLength + `/${tag}>`.length - 1;
}

function getElenemtsByTag(tag, str) {
    const arr = [];
    let start = 0;

    while(true) {
        const tempElem = getElem(tag, str, start);
        if (tempElem.startIndex < start) return arr;
        arr.push(tempElem);
        start = arr[arr.length - 1].startIndex + 1;
    }
}