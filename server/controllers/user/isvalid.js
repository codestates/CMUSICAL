const { users } = require('../../models');

module.exports = {
  post: async (req, res) => {
    // 뭐가 들어올지는 모르지만 어쨋든 하나만 들어오기 때문에 하나만 따로 빼준다!
    const key = Object.keys(req.body)[0];

    try {
      // 혹시라도 데이터가 없이 요청올 경우를 대비해서 데이터가 있는 경우에만 실행
      if (!key) {
        return res.status(400).send({ message: 'empty request' });
      }
      const isValid = await users.findOne({ where: { [key]: req.body[key] } });
      if (!isValid) {
        return res.status(200).send({ message: 'success' });
      }
      return res.status(409).send({ message: 'conflict information' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
