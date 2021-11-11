// Filter 처리 기능은 파라미터로 받음
module.exports = {
  get: (req, res) => {
    // console.log(req.query);
    if (req.query.title) {
      console.log('contents getitems query');
    } else {
      console.log('contents getitems');
    }
    res.send();
  },
};
