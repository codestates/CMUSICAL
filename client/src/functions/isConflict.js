import axios from 'axios';
axios.defaults.withCredentials = true;

const isConflict = async values => {
  const conflictMsg = {};
  if (!!values.username) {
    await axios
      .post('https://localhost:4000/user/isValid', { username: values.username })
      .then(res => {
        // console.log('성공 res', res);
        conflictMsg.username = '';
      })
      .catch(err => {
        // TODO: 서버에서 리팩토링 된 메세지 보고 중복안내메세지 띄우기
        // console.log('중복 res', err.response);
        conflictMsg.username = '사용중인 아이디입니다.';
      });
  }

  // !----------------------------------------------------------------!

  if (!!values.email) {
    await axios
      .post('https://localhost:4000/user/isValid', { email: values.email })
      .then(res => {
        conflictMsg.email = '';
        // console.log('성공 res', res);
      })
      .catch(err => {
        // TODO: 서버에서 리팩토링 된 메세지 보고 중복안내메세지 띄우기
        // console.log('중복 res', err.response);
        conflictMsg.email = '사용중인 이메일입니다.';
      });
  }

  // !----------------------------------------------------------------!

  if (!!values.nickname) {
    await axios
      .post('https://localhost:4000/user/isValid', { nickname: values.nickname })
      .then(res => {
        // console.log('성공 res', res);
        conflictMsg.nickname = '';
      })
      .catch(err => {
        // TODO: 서버에서 리팩토링 된 메세지 보고 중복안내메세지 띄우기
        // console.log('중복 res', err.response);
        conflictMsg.nickname = '사용중인 닉네임입니다.';
      });
  }
  // await console.log(conflictMsg);
  return conflictMsg;
  // ((resolve, reject) => resolve.values)
};

export default isConflict;
