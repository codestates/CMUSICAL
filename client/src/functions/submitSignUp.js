import axios from 'axios';
axios.defaults.withCredentials = true;

const submitSignUp = async values => {
  const { username, email, nickname, password } = values;
  let signUpMsg = {
    result: '',
    conflictMsg: {},
  };
  // ! 비동기 실행 결과를 반환하는 return문이 필요함
  // ! 없으면 undefined 반환
  return await axios
    .post(
      `${process.env.REACT_APP_SERVER_ADDR}/user/signup`, //
      { username, email, nickname, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(res => {
      // TODO: 회원 가입 성공
      // ? return navigate('/signin');
      signUpMsg.result = true;
      return signUpMsg;
    })
    .catch(err => {
      // TODO: 회원 가입 실패
      if (!err.response) {
        signUpMsg.result = false;
        return signUpMsg;
      }
      // TODO: 에러 메세지 변환
      const errMsg = err.response.data.data.isConflict;
      if (!errMsg.isConflictUsername) {
        signUpMsg.conflictMsg.username = '사용중인 아이디입니다.';
      }
      if (!errMsg.isConflictNickname) {
        signUpMsg.conflictMsg.nickname = '사용중인 닉네임입니다.';
      }
      if (!errMsg.isConflictEmail) {
        signUpMsg.conflictMsg.email = '사용중인 이메일입니다.';
      }
      signUpMsg.result = false;
      return signUpMsg;
    });
};

export default submitSignUp;
