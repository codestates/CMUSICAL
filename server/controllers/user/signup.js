const { users } = require('../../models');
const { validation, confliction } = require('../inspectfunction');
//! 모델 속성 자체에 유효성검사와 중복검사 부여 가능(unique, validate)
module.exports = {
  post: async (req, res) => {
    try {
      const { username, email, nickname, password } = req.body;
      if (username && email && nickname && password) {
        // todo: 유효성 검사!
        const isValid = validation(req.body);
        const { isValidUsername, isValidEmail, isValidNickname, isValidPassword } = isValid;

        // todo: 중복검사!
        const isConflict = await confliction(req.body);
        const { isConflictUsername, isConflictEmail, isConflictNickname } = isConflict;

        if (!(isValidUsername && isValidEmail && isValidNickname && isValidPassword) || !(isConflictUsername && isConflictEmail && isConflictNickname)) {
          res.status(406).send({ data: { isValid, isConflict } });
        } else {
          // 대소문자 구분을 못함...
          // todo: 일치하는 데이터가 없다면 데이터베이스에 저장
          await users.create({ username, email, nickname, password });
          res.status(200).send({ message: 'success' });
        }
      } else {
        // todo: 모든 유저 정보가 들어오지 않았을 경우
        res.status(400).send({ message: 'invalid information' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
