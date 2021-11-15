const { items, posters } = require('../../models');
//todo: 포스터도 같이 나오게 해주기
module.exports = {
  get: async (req, res) => {
    // 원래는 조인기능을 사용해서 응답해주는게 정석이지만! 클라이언트의 편의성을 위해 합쳐서 줌!
    try {
      const musical = await items.findOne({
        where: { id: req.query.id },
        raw: true,
      });
      const musicalPoster = await posters.findAll({ attributes: ['poster'], where: { itemId: req.query.id }, raw: true });
      //뮤지컬정보에 포스터 정보 추가해서 보내주기
      musical.poster = musicalPoster;

      res.status(200).send({ item: musical });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
