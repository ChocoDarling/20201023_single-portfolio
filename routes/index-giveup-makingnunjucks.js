const app = require('express')();
const fs = require('fs').promises;
const router = require('express').Router();
const path = require('path');

app.render = (res, path, obj) => {
    fs.readFile(path)
        .then((data) => {
            data = data.toString();
            let tempStr = findOrder(data, 0);
            const tempKeys = Object.keys(obj);
            let tempIdx = 0;
            let count = 3;
            while (tempStr[2]) {
                if(!count--) break;
                tempIdx = tempStr[1];
                let tempVar = findVar(tempKeys, tempStr[2]);
                if (tempVar && tempKeys.includes(tempVar)) {
                    console.log('있어');
                } else {
                    console.log('없어');
                    if (tempStr[2].includes('.')){

                    } else {
                        let tempEnd = findEnd(data, tempIdx);
                        if (tempStr[2].includes('if')) {
                            console.log('if야');
                            const tempElse = findElse(data, tempIdx);
                            if (tempEnd[1] > tempElse[1]) {
                                data = data.replace(tempEnd[2], '');
                                tempEnd = tempElse;
                            }
                        } else if (tempStr[2].includes('of')){
                            tempVarS = tempStr[2]
                                .match(/\s+{{\s*template\s*of\s*\S*\s*}}\s*/).toString()
                                .replace(/\s+{{\s*template\s*of\s*/, '')
                                .replace(/\s*}}\s*/, '');
                            tempVarE = tempEnd[2].replace(/\s+{{\s*end\s/, '').replace(/\s*}}\s*/, '');
                            console.log(tempVarS);
                            console.log(tempVarE);
                            while (tempVarS !== tempVarE) {
                                console.log('while 들어왔어');
                                tempIdx = tempEnd[1];
                                tempEnd = findEnd(data, tempIdx);
                                tempVarE = tempEnd[2].replace(/\s+{{\s*end\s/, '').replace(/\s*}}\s*/, '');
                            }
                        }
                        tempStr[1] = tempEnd[1];
                    }
                    data = data.replace(data.slice(tempStr[0], tempStr[1]), '');
                }
                tempStr = findOrder(data, tempIdx);
            }

            console.log(tempIdx);


            // let tempLength = data.slice(tempIdx).indexOf('{{');
            // while (tempLength > -1) {
            //     tempIdx += tempLength;
            //     console.log(tempLength);
            //     console.log(tempIdx);
            //     const tempStr = data.substr(tempIdx, data.slice(tempIdx).indexOf('}}'));
            //     if (tempStr.indexOf('if') > -1) {
            //         const tempKey = findVar(tempKeys, tempStr);
            //         console.log(tempKey);
            //         if (tempKey) {

            //         }
            //     } else if (tempStr.indexOf('template') > -1) {

            //     }
            //     tempIdx += tempStr.length;
            //     console.log(tempLength);
            //     console.log(tempIdx);
            //     console.log(tempStr);
            //     tempLength = data.slice(tempIdx).indexOf('{{');
            // }

{
//             while (tempIdx > -1) {
//                 const tempObj = {};
//                 tempObj['startIdx'] = tempIdx;
//                 const tempStartStr = data.slice(tempObj['startIdx']).match(/\r\n\s*{{/);
//                 if (!tempStartStr) break;
//                 tempIdx = data.slice(tempObj['startIdx']).indexOf(tempStartStr);
//                 if (tempIdx < 0) break;
//                 tempObj['startIdx'] += tempIdx;
//                 const tempStr = data.slice(tempObj['startIdx'] + tempStartStr.length);
//                 tempObj['endIdx'] = tempObj['startIdx'] + tempStartStr.length + tempStr.indexOf('}}') + 2;
//                 tempObj['order'] = data
//                     .slice(tempObj['startIdx'], tempObj['endIdx'])
//                     .replace(/[{{|}}]/g, '')
//                     .split(/\s+/);
//                 tempIdx = tempObj.endIdx;
//                 tempArr.push(tempObj);
//                 console.log(tempIdx);
//             }
//             console.log(tempArr);
            
//             const tempKeys = Object.keys(obj);
//             let tempStartIdx = 0;
//             // tempArr.forEach(v => {
//             //     const objIdx = tempKeys.indexOf(v.var);
//             //     switch (v.order) {
//             //         case 'if':

//             //             break;
                
//             //         case 'else':
                    
//             //             break;
                
//             //         case 'template':
                
//             //             break;
                
//             //         case 'end':
                
//             //             break;
                
//             //         default:
//             //             break;
//             //     }
//             // })

//             // const tempKeys = Object.keys(obj);
//             // let dataIf = data.match(/{{\s*if\s*\S*\s*}}/gi).toString().split(',');
//             // dataIf = dataIf.map(v => v.replace(/\s*/gi, ''));
//             // let dataTemplate = data.match(/{{\s*template of \s*\S*\s*}}/gi).toString().split(',');
//             // dataTemplate = dataTemplate.map(v => v.replace(/\s*/gi, ''));
//             // console.log(dataIf);
//             // console.log(dataTemplate);
//             // tempKeys.forEach(v => {
//             //     const tempVIf = dataIf.indexOf(`{{if${v}}}`);
//             //     const tempVTemplate = dataTemplate.indexOf(`{{templateof${v}}}`);
//             //     if (tempVTemplate > -1) {
//             //         console.log('찾았다');
//             //         dataTemplate.remove(tempVTemplate);
//             //         // const startElse = data.indexOf(/\r\n\s*{{\s*else/+ ` ${obj[v]}` + /\s*}}/);
//             //         // const endIf = data.indexOf(/{{\s*end/+ ` ${obj[v]}` + /\s*}}/);
//             //         // data = data.slice(0, startElse) + data.slice(endIf);
//             //     }
//             // });
//             // dataIf.forEach(v => {
//             //     const startI = data.indexOf(/\r\n\s*{{\s*if/);
//             //     const elseI = data.indexOf(/\r\n\s*{{\s*if/);
//             //     const endI = data.indexOf(/\r\n\s*{{\s*if/);
//             //     data.replace(/\r\n\s*{{\s*if[\s*|\S*]*/)
//             // })
//             // if (dataIf.indexOf(`{{if${v}}}`) > -1) {
//             //     console.log('찾았다');
//             //     const startElse = data.indexOf(/\r\n\s*{{\s*else/+ ` ${obj[v]}` + /\s*}}/);
//             //     const endIf = data.indexOf(/{{\s*end/+ ` ${obj[v]}` + /\s*}}/);
//             //     data = data.slice(0, startElse) + data.slice(endIf);
//             // }
//             // console.log(dataIf);
//             // console.log(dataTemplate);
}

            res.send(data);
        });
};

router.get('/', (req, res) => {
    const tempOBJ = { 
        '이거': '진짜', 
    };
    app.render(res, './views/main.html', tempOBJ);
});

router.get(/\/imgs\/\S*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../', req.url));
});

module.exports = router;

function findOrder(str, startIdx) {
    let tempStr = str.slice(startIdx).match(/\s+{{/);
    if (!tempStr) return;
    const tempStart = startIdx + str.slice(startIdx).indexOf(tempStr);
    let tempEnd = tempStart + tempStr.toString().length;
    tempStr = str.slice(tempEnd).match(/\s+{{/);
    tempEnd += str.slice(tempEnd).indexOf(tempStr);
    return [tempStart, tempEnd, str.slice(tempStart, tempEnd)];
}

function findVar(keys, str) {
    for (let i = 0; i < keys.length; i++) {
        if (str.indexOf(keys[i]) > -1) return keys[i];
    }
    return;
}

function findEnd(str, startIdx) {
    let tempIdx = startIdx;
    while (true) {
        const temp = findOrder(str, tempIdx);
        const tempFindStr = temp[2].match(/\s+{{\s*end\s*\S*\s*}}/);
        if (!tempFindStr) {
            tempIdx = temp[1];
            continue;
        }
        return [temp[0], temp[0] + tempFindStr.toString().length, tempFindStr.toString()];
    }
}

function findElse(str, startIdx) {
    let tempIdx = startIdx;
    while (true) {
        const temp = findOrder(str, tempIdx);
        const tempFindStr = temp[2].match(/\s+{{\s*else\s*\S*\s*}}/);
        if (!tempFindStr) {
            tempIdx = temp[1];
            continue;
        }
        return [temp[0], temp[0] + tempFindStr.toString().length, tempFindStr.toString()];
    }
}

// function getElem(tag, str, startIndex = 0) {
//     const tempElem = {};
    
//     str = str.replace(/\s*\r\n\s*/g, '').replace(/\s*=\s*/g, '=');
//     tempElem['tag'] = tag;
//     tempElem['startIndex'] = findStartIndex(str, tempElem.tag, startIndex);
//     tempElem['endIndex'] = findEndIndex(str, tempElem.startIndex, tempElem.tag);
//     tempElem['openTag'] = str.substr(tempElem.startIndex, str.slice(tempElem.startIndex).indexOf('>') + 1);
//     tempElem['outerHTML'] = str.slice(tempElem.startIndex, tempElem.endIndex);
//     tempElem['innerHTML'] = tempElem.outerHTML.slice(
//         tempElem.outerHTML.indexOf('>') + 1, 
//         tempElem.outerHTML.length - `</${tempElem.tag}>`.length
//     );
//     if (tempElem.startIndex === -1) return;
//     return tempElem;
// }

// function findStartIndex(str, tag, startIndex = 0) {
//     return startIndex + str.slice(startIndex).indexOf(`<${tag}`);
// }

// function findEndIndex(str, startIndex, tag) {
//     let tempStr = str.slice(startIndex + tag.length + 1);
//     let fullLength = tag.length + 1;
//     let count = 1;

//     if (tempStr.indexOf(`/${tag}>`) < 0) return -1;
//     while(count) {
//         const tempStart = findStartIndex(tempStr, tag);
//         const tempEnd = tempStr.indexOf(`/${tag}>`);
//         if (tempStart > 0 && tempStart < tempEnd) {
//             count++;
//             tempStr = tempStr.slice(tempStart + tag.length + 1);
//             fullLength += tempStart + tag.length + 1;
//         } else {
//             count--;
//             tempStr = tempStr.slice(tempEnd + 1);
//             fullLength += tempEnd + 1;
//         }
//     }

//     return startIndex + fullLength + `/${tag}>`.length - 1;
// }

// function getElenemtsByTag(tag, str) {
//     const arr = [];
//     let start = 0;

//     while(true) {
//         const tempElem = getElem(tag, str, start);
//         if (tempElem.startIndex < start) return arr;
//         arr.push(tempElem);
//         start = arr[arr.length - 1].startIndex + 1;
//     }
// }