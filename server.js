const express = require('express') //экспорт експрес
const fs = require('fs');
const selfSignedCertificate = require('openssl-self-signed-certificate');

const PORT = 18001 //задали порт
const app = express(); //создание сервера

function tsv2json(tsv) {
    const lines = tsv.split("\n");
    const data = lines.map(line =>
        line.trim().split("\t")
    );
    try {
        const json = JSON.stringify(data)
        return json
    } catch (error) {
        console.error(error);
    }
    return "error";
}

app.use(express.json());

app.get('/report', (req, res) => {
    fs.readFile('tst.txt', 'utf-8', (err, data) => {
        const json = tsv2json(data);
        res.send(json);
    });
});
const options = {
    key: fs.readFileSync(selfSignedCertificate.key),
    cert: fs.readFileSync(selfSignedCertificate.cert),
  };
  
  const server = https.createServer(options, app);
app.listen(PORT);

