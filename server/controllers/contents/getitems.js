const { items } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
// Filter 처리 기능은 파라미터로 받음
module.exports = {
  get: async (req, res) => {
    try {
      const { title, page } = req.query;
      // 데이터베이스의 시작지점
      let offset = 0;
      // page가 넘어가면 데이터베이스의 시작지점도 이동시키기
      if (page > 1) {
        offset = 8 * (page - 1);
      }
      const musicals = await items.findAll({
        //! 띄워쓰기 검색기능 구현해보기
        //! 배우나 공연장 등 어떤 검색을 해도 결과가 나오게 해주기
        where: { title: { [Op.like]: `%${title ? title : ''}%` } },
        attributes: ['id', 'title', 'thumbnail'],
        // 시작지점
        offset,
        // 보여줄 정보의 갯수
        limit: 8,
      });

      if (musicals.length === 0) {
        return res.status(404).send({ message: 'not found musical' });
      }
      return res.status(200).send({ items: musicals });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
