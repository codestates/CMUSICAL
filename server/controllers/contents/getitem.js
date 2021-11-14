const { items } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const musical = await items.findOne({
        where: { id: req.query.id },
        raw: true,
      });
      res.status(200).send({ item: musical });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
