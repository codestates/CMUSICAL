const axios = require('axios');
const parser = require('fast-xml-parser');
const { isVerify } = require('./controllers/tokenfunction');
const { items } = require('./models');
require('dotenv').config();

module.exports = {
  getApiData: async (req, res) => {
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
      // 어드민 계정이 아니면 권한이 없음
      if (id !== 1) {
        return res.status(403).send({ message: 'not authorization' });
      }
      // 오픈 API를 통한 뮤지컬 기본정보 가져오기
      const apiData = (
        await axios
          .get(`http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.KOPIS_API_KEY}&stdate=20210101&eddate=20211130&rows=50&cpage=1&shcate=AAAB`)
          .then((xmlData) => parser.parse(xmlData.data))
      ).dbs.db;

      // 뮤지컬 기본정보에 들어있는 아이디를 통해 각각의 뮤지컬 상세정보 가져오기
      let detailData = [];
      for (let i = 0; i < apiData.length; i++) {
        detailData.push(
          (await axios.get(`http://www.kopis.or.kr/openApi/restful/pblprfr/${apiData[i].mt20id}?service=${process.env.KOPIS_API_KEY}`).then((xmlData) => parser.parse(xmlData.data))).dbs.db
        );
      }
      // todo: detailData의 정보들 중 필요한 정보들만 빼서 내 데이터베이스에 저장!
      //! 필요한 정보들: prfnm(공연명), prfpdfrom(공연시작일), prfpdto(공연종료일), fcltynm(공연장), prfcast(출연진),
      //! prfruntime(런타임), pcseguidance(가격), poster(썸네일), prfstate(공연상태), styurls(소개이미지), dtguidance(공연시간)
      for (let i = 0; i < detailData.length; i++) {
        await items.create({
          title: detailData[i].prfnm,
          thumbnail: detailData[i].poster,
          theater: detailData[i].fcltynm,
          price: detailData[i].pcseguidance,
          cast: detailData[i].prfcast,
          runtime: detailData[i].prfruntime,
          showtime: detailData[i].dtguidance,
          dateFrom: detailData[i].prfpdfrom,
          dateTo: detailData[i].prfpdto,
          state: detailData[i].prfstate,
          poster: detailData[i].styurls,
        });
      }
      res.status(200).send({ data: detailData });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'server error' });
    }
  },
};
