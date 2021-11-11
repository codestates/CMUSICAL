const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: true }));

const PORT = 4000;

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
