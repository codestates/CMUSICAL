import axios from 'axios';
axios.defaults.withCredentials = true;

const deleteMyInfo = async (values) => {
  console.log(values);

  return await axios
    .delete(
      `${process.env.REACT_APP_SERVER_ADDR}/user/myinfo`, //
      {
        email: values.email, //
        nickname: values.nickname,
        password: values.oldPassword,
      }
    )
    .then((res) => {
      // TODO: 회원 정보 지우기 성공
      console.log(res);
      return true;
    })
    .catch((err) => {
      // TODO: 회원 정보 지우기 실패
      console.log(err);
      return false;
    });
};
export default deleteMyInfo;
