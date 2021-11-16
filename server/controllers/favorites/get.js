const { users, items } = require('../../models');
const { isVerify } = require('../tokenfunction');
const db = require('../../models');

module.exports = {
  get: async (req, res) => {
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
      const validUser = await users.findOne({ where: { id }, raw: true });
      // 데이터베이스에 없는 아이템일 경우
      if (!validUser) {
        return res.status(400).send({ message: 'not found user' });
      }
      // 사용중인 유저가 즐겨찾기 한 아이템의 아이디를 모두 가져오기
      const favoriteItems = await db.sequelize.models.favorites.findAll({ attributes: ['itemId'], where: { userId: id }, raw: true });

      // 가져온 아이디로 아이템 정보들 가져오기
      let myFavorites = [];
      for (let i = 0; i < favoriteItems.length; i++) {
        const id = favoriteItems[i].itemId;
        myFavorites.push(await items.findOne({ attributes: ['id', 'title', 'thumbnail'], where: { id }, raw: true }));
      }

      res.status(200).send({ items: myFavorites });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
