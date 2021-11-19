const { isVerify } = require('../tokenfunction');
const { comment } = require('../../models');
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

      const { commentId } = req.query;
      const validComment = await comment.findOne({ where: { id: commentId } });

      // 존재하지 않는 댓글인 경우
      if (!validComment) {
        return res.status(404).send({ message: 'not found comment' });
      }
      const validLike = await db.sequelize.models.likes.findOne({ where: { userId: id, commentId } });

      if (!validLike) {
        return res.status(404).send({ message: 'not found like' });
      }
      await db.sequelize.models.likes.destroy({ where: { commentId, userId: id } });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
