const { isVerify } = require('../../tokenfunction');
const { users } = require('../../../models');

module.exports = {
  get: async (req, res) => {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'unauthorized' });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      try {
        //쿠키에 토큰이 담겨왔다면 토큰을 검증 후 데이터베이스에서 일치하는 유저정보가 있다면 응답해주기
        const verifyToken = isVerify(token);

        if (verifyToken) {
          const { id, nickname, email } = verifyToken;
          const isUser = await users.findOne({ where: { id } });

          if (!isUser) {
            res.status(404).send({ message: 'not found user' });
          } else {
            res.status(200).send({ data: { nickname, email } });
          }
        } else {
          res.status(406).send({ message: 'invalid token', data: null });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
      }
    }
  },
};
