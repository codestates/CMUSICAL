const { items } = require('../../models');
module.exports = {
  get: async (req, res) => {
    try {
      const musical = await items.findOne({
        where: { id: req.query.id },
        raw: true,
      });
      if (!musical) {
        return res.status(404).send({ message: 'not found item' });
      }

      return res.status(200).send({ item: musical });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'server error' });
    }
  },
};
