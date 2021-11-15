const { comment, items } = require('../../models');
const { isVerify } = require('../tokenfunction');

module.exports = {
  patch: async (req, res) => {
    if (!req.cookies.token) {
      res.status(401).send({ message: 'not found token' });
    } else {
      const token = req.cookies.token;

      try {
        const verifyToken = isVerify(token);

        if (!verifyToken) {
          res.status(406).send({ message: 'invalid token' });
        } else {
          const { id } = verifyToken;

          const validItem = await items.findOne({ where: { id: req.query.itemId }, raw: true });

          //todo: 한줄평을 남겼고, 존재하는 아이템이면 메세지가 입력된 채로 요청이 왔는지 확인 후 일치하는 한줄평을 찾아 수정
          if (!validItem) {
            res.status(404).send({ message: 'not found item' });
          } else {
            const myComment = await comment.findOne({ where: { itemId: req.query.itemId, userId: id }, raw: true });
            // 내 한줄평이 존재하지 않다면 수정 불가!
            if (!myComment) {
              res.status(404).send({ message: 'not found comment' });
            } else {
              // 한줄평을 모두 지운채로 요청했다면 수정 불가!
              if (!req.body.comment) {
                res.status(400).send({ message: 'empty comment' });
              } else {
                await comment.update({ comment: req.body.comment }, { where: { userId: id, itemId: req.query.itemId } });
                res.status(200).send({ message: 'success' });
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
      }
    }
  },
};
