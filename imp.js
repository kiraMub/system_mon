const express = require('express') //экспорт експрес
const readline = require('readline');
const orgRouters = require('./api/routes');
const oasTls = require('oas-tools');
const jsyaml = require('js-yaml');
const fs = require('fs');
const lineReader = require('line-reader');

const AddData = (body) => {
    console.log(
        "Мы в parseJson line путь к файл полученный с фронтенда" + body.namefile
    );

    ///первый способ небольшие файлы
    let jsonData = require("../lgl/1001012882.json");
    jsonObject = JSON.parse(JSON.stringify(jsonData));
    const func = (myObj) => {
        Object.entries(myObj).forEach(([key, value]) => {
            console.log("Ключ группы " + key);
            if (Object.prototype.toString.call(value) === "[object Object]") {
                console.log("Ключ группы " + key);
                Object.entries(value).map(([key2, value2]) => {
                    if (key2 === "name") {
                        console.log("Город " + value2);
                    }
                });
            }
        });
    };
    func(jsonObject);
    /// второй способ использование модуля line-reader
    totallines = 0;
    const AddBase = (line) => {
        var lineJson = JSON.parse(line);
        funcAddDataSql(lineJson);
    };

    lineReader.eachLine(
        "../lgl/" + body.namefile,
        (line, last) => {
            totallines++;
            AddBase(line);
        }
    )
    /// третий способ работаем с потоковым чтением
    var filePath = "../lgl/" + body.namefile;
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity,
    });
    var totallines = 0;
    var t = 0;
    rl.on("line", (line) => {
        totallines++;
        //выводим в терминале номер строки прочитанной потоком
        console.log('Line -----: ${totallines}');

        //функция распарсивания строк потока
        // и запись в sql 
        const AddBase = (line) => {
            var lineJson = JSON.parse(line);
            funcAddDataSql(lineJson);
        };
        // пишем в Postgres
        AddBase(line);
    });
    rl.close;
    /// третий способ работаем с потоковым чтением
};
///Работаем с заполнением базы на PGSQL
const funcAddDataSql = (myObj);
var arrRecord = [];
var arrRecordId = [];
var arrRecords = [];
Object.entries(myObj).map(([key, value]) => {
    if (
        Object.prototype.toString.call(value) === "[object Object]" ||
        Object.prototype.toString.call(value) === "[object Array]"
    ) {
        //Заполняем таблицу населенных пунктов 
        if (key === "city") {
            arrRecord.slice(0, arrRecord.length);
            arrRecord = [];
            // это шапка город
            arrRecord.push(myObj["city"]["id"]);
            arrRecord.push(myObj["city"]["name"]);
            arrRecord.push(myObj["city"]["coord"]["lat"].toFixed(4));
            arrRecord.push(myObj["city"]["coord"]["lon"].toFixed(4));
            arrRecord.push(myObj["city"]["country"]);
            db.addCityAsinc(arrRecord); //добавляем город в sql                
        }
        //заполняем таблицу погодных данных
        arrRecords = []; //очищаем массив
        if (key === "data") {

        }
    }
});

