const { comment, items } = require('../../models');
const { isVerify } = require('../tokenfunction');

module.exports = {
  patch: async (req, res) => {
    if (!req.cookies.token) {
      return res.status(401).send({ message: 'not found token' });
    }
    const token = req.cookies.token;

    try {
      const verifyToken = isVerify(token);

      if (!verifyToken) {
        return res.status(406).send({ message: 'invalid token' });
      }
      const { id } = verifyToken;

      const validItem = await items.findOne({ where: { id: req.query.itemId }, raw: true });

      //todo: 한줄평을 남겼고, 존재하는 아이템이면 메세지가 입력된 채로 요청이 왔는지 확인 후 일치하는 한줄평을 찾아 수정
      if (!validItem) {
        return res.status(404).send({ message: 'not found item' });
      }
      const myComment = await comment.findOne({ where: { itemId: req.query.itemId, userId: id }, raw: true });
      // 내 한줄평이 존재하지 않다면 수정 불가!
      if (!myComment) {
        return res.status(404).send({ message: 'not found comment' });
      }
      // 한줄평을 모두 지운채로 요청했다면 수정 불가!
      if (!req.body.comment) {
        return res.status(400).send({ message: 'empty comment' });
      }
      await comment.update({ comment: req.body.comment }, { where: { userId: id, itemId: req.query.itemId } });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
