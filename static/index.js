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
