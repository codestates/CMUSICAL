const db = require('../../models');
module.exports = {
  post: async (req, res) => {
    const { commentId, userId } = req.body;

    const isLike = await db.sequelize.models.likes.findOne({ where: { userId, commentId } });
    console.log(isLike, '1');
    if (isLike) {
      res.status(409).send({ message: '좋아요를 이미 눌렀습니다' });
    } else {
      await db.sequelize.models.likes.create({ userId, commentId });
      // console.log(isLike);
    }
    // console.log(commentId);
    // console.log(userId);

    // console.log('likes add');

    res.send();
  },
};
