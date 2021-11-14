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
//! force를 true로 바꾸면 데이터베이스 레코드가 날아가니 건드리지 말 것!!
models.sequelize.sync({ force: false });

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log('🎭🎭🎭🎭 cmusical server started 🔒 https://localhost:4000'));
} else {
  server = app.listen(PORT, () => console.log('🎭🎭🎭🎭 cmusical server started ☁️  http://localhost:4000'));
}
module.exports = server;
