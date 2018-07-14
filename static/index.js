"use strict";
//Функция парсинга информации про книги с *.json файла
function parseBooksFromJson(fileName) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", fileName, false);

  xhr.send();

  if (xhr.status != 200) {
    return xhr.status + ":" + xhr.statusText;
  } else {
    return addBookLabel(JSON.parse(xhr.responseText));
  }
}

//Функция добавление метки поля (левое-true/правое-false) для каждого объекта книги
function addBookLabel(object) {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      object[key].label = true;
    }
  }
  return object;
}

//Функция отрисовки объектов книг на экране
//object - объект с объектами для отрисовки
function displayBooks(object) {
  let leftSide = document.getElementsByClassName("left");
  let rightSide = document.getElementsByClassName("right");

  let dataOfLeftBooks = ""; //Перемення для хранения вида книг слева
  let dataOfRightBooks = ""; //Переменная для хранения вида книг справа

  for (let key in object) {
    if (object[key].label == true) {
      dataOfLeftBooks +=
        ` <div class="item">
                              <div class="pic">
                                <span>
                                  <img src="` +
        object[key].img +
        `">
                                </span>
                              </div>
                              <div class="title">
                                <span>
                                  <b>Название</b>: "` +
        object[key].name +
        `"
                                </span>
                                <span>
                                  <b>Автор</b>: ` +
        object[key].author +
        `
                                </span>
                              </div>
                              <div class="after" id="` +
        key +
        `">
                              </div>
                          </div>`;
      leftSideQuantity++; //Считаем количество в левом столбце
    } else {
      dataOfRightBooks +=
        ` <div class="item">
                              <div class="pic">
                                <span>
                                  <img src="` +
        object[key].img +
        `">
                                </span>
                              </div>
                              <div class="title">
                                <span>
                                  <b>Название</b>: "` +
        object[key].name +
        `"
                                </span>
                                <span>
                                  <b>Автор</b>: ` +
        object[key].author +
        `
                                </span>
                              </div>
                              <div class="before" id="` +
        key +
        `">
                              </div>
                          </div>`;
      rightSideQuantity++; //Считаем количество в правом стобце
    }
  }

  leftSide[0].innerHTML = dataOfLeftBooks;
  rightSide[0].innerHTML = dataOfRightBooks;
}

//Добавление данных в localStorage
function setDataToLocalStorage() {
  let booksDataToLocalStorage = JSON.stringify(booksData);

  localStorage.setItem("booksData", booksDataToLocalStorage);
}

//Получение данных из localStorage
function getDataFromLocalStorage() {
  let booksData = localStorage.getItem("booksData");

  booksData = JSON.parse(booksData);

  return booksData;
}

//Вывод количества книг по полям
function displayBooksQuantity() {
  document.getElementsByClassName("left")[1].innerHTML =
    "Количество: " + leftSideQuantity;
  document.getElementsByClassName("right")[1].innerHTML =
    "Количество: " + rightSideQuantity;
}

//Все книги (ПОдтягиваем или с localStorage или с файла)
let booksData = getDataFromLocalStorage()
  ? getDataFromLocalStorage()
  : parseBooksFromJson("/static/data.json");

//Счетчики для количества книг
let leftSideQuantity = 0;
let rightSideQuantity = 0;

let isSearch = false;

//вывод спиcков книг на экран
displayBooks(booksData);

//количество книг
displayBooksQuantity();
