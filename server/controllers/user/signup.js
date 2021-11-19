const { users } = require('../../models');
const { validation, confliction } = require('../inspectfunction');
const bcrypt = require('bcryptjs');
//! 모델 속성 자체에 유효성검사와 중복검사 부여 가능(unique, validate)
module.exports = {
  post: async (req, res) => {
    try {
      const { username, email, nickname, password } = req.body;
      if (!(username && email && nickname && password)) {
        // todo: 모든 유저 정보가 들어오지 않았을 경우
        return res.status(400).send({ message: 'invalid information' });
      }
      // todo: 유효성 검사!
      const isValid = validation(req.body);
      const { isValidUsername, isValidEmail, isValidNickname, isValidPassword } = isValid;

      // todo: 중복검사!
      const isConflict = await confliction(req.body);
      const { isConflictUsername, isConflictEmail, isConflictNickname } = isConflict;

      if (!(isValidUsername && isValidEmail && isValidNickname && isValidPassword) || !(isConflictUsername && isConflictEmail && isConflictNickname)) {
        return res.status(406).send({ data: { isValid, isConflict } });
      }
      // 닉네임 대소문자 구분을 못하는데 저장될때는 대소문자 구분해서 저장됨..
      // todo: 일치하는 데이터가 없다면 데이터베이스에 저장하기전에 비밀번호 암호화 시켜서 넣기
      const hashPassword = bcrypt.hashSync(password, 10);

      await users.create({ username, email, nickname, password: hashPassword });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
