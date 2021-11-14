const { items } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
// Filter 처리 기능은 파라미터로 받음
module.exports = {
  get: async (req, res) => {
    try {
      const musicals = await items.findAll({
        //! 띄워쓰기 검색기능 구현해보기
        //! 배우나 공연장 등 어떤 검색을 해도 결과가 나오게 해주기
        where: { title: { [Op.like]: `%${req.query.title ? req.query.title : ''}%` } },
        attributes: ['id', 'title', 'thumbnail'],
      });


      if (musicals.length > 0) {
        res.status(200).send({ items: musicals });
      } else {
        res.status(404).send({ message: 'not found musical' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
