const arr = [a={}, b=2, c=3];
const temp = [...arr.values()];
console.log(temp);
console.log(arr.map((v, i) => {
    console.log(v, i);
}));

let test = '나는 #(정경훈) 입니다. 나이는 #(21살) 이고 싶습니다.';
test.match(/#\S*[ |,|.]/g).forEach((v) => {
    console.log(v.slice(0, -1));
});

document.querySelectorAll()