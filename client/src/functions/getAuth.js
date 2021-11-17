import axios from 'axios';

export default function getAuth(loginHandler, logoutHandler) {
  axios
    .get(`${process.env.REACT_APP_SERVER_ADDR}/auth`)
    .then((data) => {
      console.log('로그인~!');
      loginHandler();
    })
    .catch((err) => {
      console.log(err);
      logoutHandler();
    });
}
