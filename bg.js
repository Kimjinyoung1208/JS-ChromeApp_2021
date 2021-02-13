const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

// 라이브러리, 모듈 = 특별한 기능을 하는 함수의 집합 (math함수같은것)

function genRandom() {
    // math.floor = 소수점 이하 반올림 & math.random = 0과 1사이 난수(무작위로 추출된 수)
    const number = Math.floor(Math.random()*2); // 0이상 1미만의 소수에 2를 곱하고 소수값을 버리면 0이상 2미만의 정수가 나옴
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
init();