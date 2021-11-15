import axios from 'axios';
axios.defaults.withCredentials = true;

const getMyInfo = async () => {
  return await axios
    .get(
      'https://localhost:4000/user/myinfo' //
    )
    .then(res => {
      // TODO: 회원 정보 가져오기 성공
      return res.data.data;
    })
    .catch(err => {
      // TODO: 회원 정보 가져오기 실패
      console.log(err);
    });
};
export default getMyInfo;
