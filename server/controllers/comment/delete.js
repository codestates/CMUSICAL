const { comment, items } = require('../../models');
const { isVerify } = require('../tokenfunction');

module.exports = {
  delete: async (req, res) => {
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

      //요청으로 받은 아이템아이디를 가지고 데이터베이스에 존재하는 아이템인지 확인 후
      if (!validItem) {
        return res.status(404).send({ message: 'not found item' });
      }
      //한줄평을 남기지 않았고, 존재하는 아이템이면 메세지가 입력된 채로 요청이 왔는지 확인 후 데이터 베이스에 추가
      await comment.destroy({ where: { userId: id, itemId: req.query.itemId } });
      return res.status(200).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
