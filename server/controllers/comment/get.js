const { comment, items } = require('../../models');
const { isVerify } = require('../tokenfunction');
const db = require('../../models');

module.exports = {
  //nickname, 자신이 쓴 댓글 구분해서 보내주기
  //todo: 로그인 한 경우, 로그인 하지 않은 경우
  get: async (req, res) => {
    //! 사용자가 클릭한 아이템에 작성된 댓글만 가져옴
    const getComments = await items.findAll({
      where: { id: req.query.itemId },
      include: [{ model: comment }],
    });

    for (let i = 0; i < getComments[0].comments.length; i++) {
      getComments[0].comments[i].dataValues['likes'] = (
        await db.sequelize.models.likes.findAll({
          where: { commentId: getComments[0].comments[i].id },
        })
      ).length;
    }

    if (!req.cookies.token) {
      // 로그인을 하지 않은 경우
      return res.status(200).send({ data: { myComment: null, othersComments: getComments[0].comments } });
    }
    // 로그인 한 경우
    const token = req.cookies.token;
    try {
      const verifyToken = isVerify(token);

      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }
      // req.query로 itemId가 들어옴
      // 선택한 아이템 정보가 없다면
      if (!req.query.itemId) {
        return res.status(404).send({ message: 'not found item' });
      }
      // todo: 사용중인 유저가 좋아요를 누른 댓글id도 같이 보내주기
      const { id } = verifyToken;
      let commentLikes = await db.sequelize.models.likes.findAll({ where: { userId: id }, attributes: ['commentId'], raw: true });

      commentLikes = commentLikes.map((el) => el.commentId);

      let myComment = [],
        othersComments = [];

      for (let i = 0; i < getComments[0].comments.length; i++) {
        if (getComments[0].comments[i].userId === id) {
          myComment.push(getComments[0].comments[i]);
        } else {
          othersComments.push(getComments[0].comments[i]);
        }
      }

      return res.status(200).send({ data: { myComment, othersComments, commentLikes } });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
