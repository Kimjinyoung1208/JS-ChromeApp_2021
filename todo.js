const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let idNumbers = 1;

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) { // filter() = 배열을 순회하며 요소마다 조건을 확인한 후 조건을 만족한 원소들로 구성된 새로운 배열로 리턴하는 함수
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); 
    // JSON.stringify() = 자바스크립트 object를 string으로 변환 = localstorage는 자바스크립트의 object를 저장할 수 없기 때문(string만 저장 가능)
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    // const newId = toDos.length+1;
    const newId = idNumbers;
    idNumbers += 1;
    delBtn.innerHTML = "✔"; // window+; = 이모티콘
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span); // appendChild = 무언가를 father element에 넣는 것
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text, // 'text:' = paintToDo의 매개변수 text를 받아주기 위한 변수
        id: newId
    }; // localstorage에도 저장해줘야하기 때문?
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const pasedToDos = JSON.parse(loadedToDos);
        // JSON = JavaScript Object Notation(표기법) = 데이터 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
        // string을 object로 또는 object를 string으로 변환해줌
        pasedToDos.forEach(function(toDo) { // toDo는 변수로 선언한 것
            paintToDo(toDo.text);
        }); // forEach() = array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜주는 함수

    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();