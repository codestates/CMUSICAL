const { items } = require('../../models');
const { isVerify } = require('../tokenfunction');
const db = require('../../models');

module.exports = {
  delete: async (req, res) => {
    // 토큰이 담겨있지 않은 경우
    if (!req.cookies.token) {
      return res.status(401).send({ message: 'not found token' });
    }
    const token = req.cookies.token;

    try {
      const verifyToken = isVerify(token);
      // 유효한 토큰이 아닌 경우
      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }
      const { id } = verifyToken;
      const validItem = await items.findOne({ where: { id: req.query.itemId }, raw: true });
      // 데이터베이스에 없는 아이템일 경우
      if (!validItem) {
        return res.status(400).send({ message: 'not found item' });
      }
      await db.sequelize.models.favorites.destroy({ where: { itemId: req.query.itemId, userId: id } });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
