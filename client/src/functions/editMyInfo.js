import axios from 'axios';
axios.defaults.withCredentials = true;

const editMyInfo = values => {
  return axios
    .patch(
      `${process.env.REACT_APP_SERVER_ADDR}/user/myinfo`, //
      {
        email: values.email, //
        nickname: values.nickname,
        newPassword: values.password,
        oldPassword: values.oldPassword,
      }
    )
    .then(res => {
      // TODO: 회원 정보 가져오기 성공
      return true;
    })
    .catch(err => {
      // TODO: 회원 정보 가져오기 실패
      console.log(err.response);
      return false;
    });
};
export default editMyInfo;
