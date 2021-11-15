const { comment } = require('../../models');
const { isVerify } = require('../tokenfunction');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  //nickname, 자신이 쓴 댓글 구분해서 보내주기
  get: async (req, res) => {
    if (!req.headers.authorization) {
      // 로그인을 하지 않은 경우
      const allComments = await comment.findAll({ where: { itemId: req.query.itemId } });
      res.status(200).send({ data: { allComments } });
    } else {
      // 로그인 한 경우
      const token = req.headers.authorization.split(' ')[1];
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
            const myComment = await comment.findOne({ where: { itemId: req.query.itemId, userId: id }, raw: true });
            const othersComments = await comment.findAll({ where: { itemId: req.query.itemId, userId: { [Op.ne]: id } } });

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
