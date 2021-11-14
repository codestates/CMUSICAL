const { isVerify } = require('../../tokenfunction');
const { validation, confliction } = require('../../inspectfunction');
const { users } = require('../../../models');
//todo: post 요청과 쿠키를 비교해서 달라진 값만 유효성,중복검사 요청!
module.exports = {
  patch: async (req, res) => {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'unauthorized' });
    } else {
      const token = req.headers.authorization.split(' ')[1];

      try {
        const VerifyToken = isVerify(token);
        // 토큰이 제대로 담겨있고 유효한 토큰이라면
        if (VerifyToken) {
          // 유효성 검사
          const inspectData = {};

          // 검증한 토큰의 아이디와 같은 아이디를 가진 유저 정보를 데이터베이스에서 가져온다
          const userInfo = await users.findOne({ where: { id: VerifyToken.id }, raw: true });
          const { id, nickname, email, password } = userInfo;
          // 바꾸고 싶은 비밀번호가 있을때
          if (req.body.password) {
            // 현재 비밀번호를 입력하지 않았다면
            if (!req.body.oldPassword) {
              // 현재 비밀번호가 입력되지 않았다는 메세지 응답
              res.status(400).send({ message: 'fill out oldPassword' });
            } else {
              // 현재 비밀번호가 입력되었지만 데이터베이스에 있는 비밀번호와 일치하지 않을 경우
              if (req.body.oldPassword !== password) {
                // 유효하지 않는 비밀번호라는 메세지로 응답
                return res.status(400).send({ message: 'invalid password' });
              } else {
                // 바꾸고 싶은 비밀번호도 있고 입력한 현재 비밀번호와 데이터베이스의 비밀번호와 일치하고
                // 변경할 비밀번호가 데이터베이스에 있는 비밀번호와 겹치지 않으면 inspectData에 검사할 비밀번호 추가
                if (req.body.password !== password) {
                  inspectData.password = req.body.password;
                }
              }
            }
          }
          if (req.body.nickname !== nickname) {
            inspectData.nickname = req.body.nickname;
          }
          if (req.body.email !== email) {
            inspectData.email = req.body.email;
          }
          // 유효성 검사
          const isValid = validation(inspectData);
          const { isValidNickname, isValidEmail, isValidPassword } = isValid;
          // 중복 검사
          const isConflict = await confliction(inspectData);
          const { isConflictNickname, isConflictEmail } = isConflict;

          if (!(isValidNickname && isValidEmail && isValidPassword) || !(isConflictNickname && isConflictEmail)) {
            res.status(406).send({ data: { isValid, isConflict } });
          } else {
            // 유효성 검사와 중복검사를 통과했으면 정보수정 해주기
            const key = Object.keys(inspectData);

            if (key.length === 0) {
              res.status(400).send({ message: 'fill out' });
            } else {
              key.map(async (key) => {
                if (key === 'nickname') {
                  await users.update({ nickname: inspectData[key] }, { where: { id } });
                }
                if (key === 'email') {
                  await users.update({ email: inspectData[key] }, { where: { id } });
                }
                if (key === 'password') {
                  await users.update({ password: inspectData[key] }, { where: { id } });
                }
              });
              res.status(200).send({ message: 'success' });
            }
          }
        } else {
          res.status(406).send({ message: 'invalid token' });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
      }
    }
  },
};
