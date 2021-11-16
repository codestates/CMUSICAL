const { users } = require('../../models');
const { getToken } = require('../tokenfunction');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();

module.exports = {
  post: async (req, res) => {
    const { username, password } = req.body;

    // 요청과 일치하는 유저가 있는지 조회
    const isUser = await users.findOne({
      attributes: ['id', 'username', 'nickname', 'email', 'password'],
      where: { username },
      // dataValues만 가져올 수 있는 속성
      raw: true,
    });
    // 없다면 비밀번호와 아이디 중 하나가 일치하지 않는 것
    try {
      if (!isUser || !bcrypt.compareSync(password, isUser.password)) {
        return res.status(400).send({ message: 'invalid username or password' });
      }
      //todo: 유저 정보가 있다면 패스워드를 제외한 정보로 토큰을 만들어 쿠키로 전달하고 success 메세지 전달
      const { id, username, nickname, email } = isUser;
      const userInfo = { id, username, nickname, email };

      const token = getToken(userInfo);

      res.cookie('token', token, { sameSite: 'None', secure: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
