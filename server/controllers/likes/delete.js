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

      if (!req.query.commentId) {
        return res.status(404).send({ message: 'not found comment' });
      }
      const { commentId } = req.query;

      const isLike = await db.sequelize.models.likes.findOne({ where: { userId: id, commentId } });
      console.log(isLike);
      if (!isLike) {
        return res.status(404).send({ message: 'not found' });
      }
      await db.sequelize.models.likes.destroy({ where: { commentId, userId: id } });
      res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
