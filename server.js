const express = require('express') //экспорт експрес

const orgRouters = require('./api/routes');
const oasTls    =require('oas-tools');
const jsyaml    =require('js-yaml');
const fs        =require('fs');

const PORT = 18001 //задали порт
const app = express(); //создание сервера


app.use(express.json());

app.get('/', (req, res) => {
    res.send('NODE WORK');
});

app.use("/api/v1/organizations", orgRouters);

app.listen(PORT, () => console.log('server started on post ${PORT}')) //вывод информации о сервере на порте

