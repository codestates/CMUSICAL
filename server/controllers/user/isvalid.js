const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    let isValid;
    // 뭐가 들어올지는 모르지만 어쨋든 하나만 들어오기 때문에 하나만 따로 빼준다!
    const key = Object.keys(req.body)[0];

    // 혹시라도 데이터가 없이 요청돌 경우를 대비해서 데이터가 있는 경우에만 실행
    if (key) {
      if (key === 'username') {
        isValid = await users.findOne({ where: { username: req.body[key] } });
      }
      if (key === 'email') {
        isValid = await users.findOne({ where: { email: req.body[key] } });
      }
      if (key === 'nickname') {
        isValid = await users.findOne({ where: { nickname: req.body[key] } });
      }
      // 일치하는게 없다면 중복검사 통과!
      if (!isValid) {
        res.status(200).send({ message: 'success' });
      } else {
        res.status(409).send({ message: 'conflict information' });
      }
    } else {
      res.status(400).send({ message: 'empty request' });
    }
  },
};
