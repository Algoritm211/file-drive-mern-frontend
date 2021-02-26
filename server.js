const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const cors = require('cors');

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(cors());
app.use(favicon(__dirname + '/build/favicon.png'));

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
  return res.send('pong');
});

//обслуживание html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
