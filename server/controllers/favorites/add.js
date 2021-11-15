const { items } = require('../../models');
const { isVerify } = require('../tokenfunction');
const db = require('../../models');

module.exports = {
  post: async (req, res) => {
    // 토큰이 담겨있지 않은 경우
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];

    try {
      const verifyToken = isVerify(token);
      // 유효한 토큰이 아닌 경우
      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }
      const { id } = verifyToken;
      const validItem = await items.findOne({ where: { id: req.body.itemId }, raw: true });
      // 데이터베이스에 없는 아이템일 경우
      if (!validItem) {
        return res.status(400).send({ message: 'not found item' });
      }
      await db.sequelize.models.favorites.create({ itemId: req.body.itemId, userId: id });
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
