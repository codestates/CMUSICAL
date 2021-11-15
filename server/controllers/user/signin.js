const { users } = require('../../models');
const { getToken } = require('../tokenfunction');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  post: async (req, res) => {
    const { username, password } = req.body;

    // 요청과 일치하는 유저가 있는지 조회
    const user = await users.findOne({
      attributes: ['id', 'username', 'nickname', 'email'],
      where: { username, password },
      // dataValues만 가져올 수 있는 속성
      raw: true,
    });
    // console.log(user);
    // 없다면 비밀번호와 아이디 중 하나가 일치하지 않는 것
    try {
      if (!user) {
        res.status(400).send({ message: 'invalid username or password' });
      } else {
        //todo: 유저 정보가 있다면 토큰을 만들고 토큰은 쿠키로 전달하고 success 메세지 전달
        const token = getToken(user);
        res.cookie('token', token, { sameSite: 'None', secure: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });
        res.status(200).send({ message: 'success', data: token });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
