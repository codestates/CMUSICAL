const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // 뭐가 들어올지는 모르지만 어쨋든 하나만 들어오기 때문에 하나만 따로 빼준다!
    const key = Object.keys(req.body)[0];

    // 혹시라도 데이터가 없이 요청돌 경우를 대비해서 데이터가 있는 경우에만 실행
    try {
      if (key) {
        const isValid = await users.findOne({ where: { [key]: req.body[key] } });
        if (!isValid) {
          res.status(200).send({ message: 'success' });
        } else {
          res.status(409).send({ message: 'conflict information' });
        }
      } else {
        res.status(400).send({ message: 'empty request' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
