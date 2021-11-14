const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const models = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));
const PORT = 4000;

app.use('/', routes);
//! force를 true로 바꾸면 데이터베이스 정보가 날아가니 건드리지 말 것!!
//? update와 같은 기능을 하는 속성이 있나?
models.sequelize.sync({ force: false });

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log('https가 실행됨'));
} else {
  server = app.listen(PORT, () => console.log('http가 실행됨'));
}
module.exports = server;
