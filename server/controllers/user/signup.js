const { users } = require('../../models');
//! 모델 속성 자체에 유효성검사와 중복검사 부여 가능(unique, validate)
module.exports = {
  post: async (req, res) => {
    // console.log(users);
    const { username, email, nickname, password } = req.body;
    if (username && email && nickname && password) {
      // todo: 모든 정보가 들어왔다면 유효성 검사!
      if (!/^[a-z][a-z0-9]{3,15}$/g.test(username)) {
        return res.status(406).send({ message: 'invalid username' });
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(406).send({ message: 'invalid email' });
      }
      if (!/^[가-힣a-zA-Z0-9]{2,10}$/g.test(nickname)) {
        return res.status(406).send({ message: 'invalid nickname' });
      }
      if (password.length < 8) {
        return res.status(406).send({ message: 'invalid password' });
      }
      // todo: 모든 유효성 검사를 통과 했다면 저장하기 전에 다시한번 중복검사!
      // 대소문자 구분을 못함...
      if (await users.findOne({ where: { username } })) {
        return res.status(409).send({ message: 'conflict username' });
      }
      if (await users.findOne({ where: { email } })) {
        return res.status(409).send({ message: 'conflict email' });
      }
      if (await users.findOne({ where: { nickname } })) {
        return res.status(409).send({ message: 'conflict nickname' });
      }
      // todo: 일치하는 데이터가 없다면 데이터베이스에 저장
      await users.create({ username, email, nickname, password });
      res.status(200).send({ message: 'success' });
    } else {
      // todo: 모든 유저 정보가 들어오지 않았을 경우
      res.status(400).send({ message: 'invalid information' });
    }
  },
};
