const { comment, items } = require('../../models');
const { isVerify } = require('../tokenfunction');
const db = require('../../models');

module.exports = {
  //nickname, 자신이 쓴 댓글 구분해서 보내주기
  get: async (req, res) => {
    //! 사용자가 클릭한 아이템에 작성된 댓글만 가져옴
    const getComments = await items.findAll({
      where: { id: req.query.itemId },
      include: [
        {
          model: comment,
        },
      ],
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
      res.status(200).send({ data: { myComment: null, othersComments: getComments[0].comments } });
    } else {
      // 로그인 한 경우
      const token = req.cookies.token;
      try {
        const verifyToken = isVerify(token);

        if (!verifyToken) {
          res.status(406).send({ message: 'invalid token' });
        } else {
          // req.query로 itemId가 들어옴
          // 선택한 아이템 정보가 없다면
          if (!req.query.itemId) {
            res.status(404).send({ message: 'not found item' });
          } else {
            const { id } = verifyToken;
            let myComment = [],
              othersComments = [];

            for (let i = 0; i < getComments[0].comments.length; i++) {
              if (getComments[0].comments[i].userId === id) {
                myComment.push(getComments[0].comments[i]);
              } else {
                othersComments.push(getComments[0].comments[i]);
              }
            }

            res.status(200).send({ data: { myComment, othersComments } });
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
      }
    }
  },
};
