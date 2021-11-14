const { users } = require('../../models');

module.exports = {
  validation: ({ username, email, nickname, password }) => {
    const result = {
      isValidUsername: true,
      isValidEmail: true,
      isValidNickname: true,
      isValidPassword: true,
    };

    if (username) {
      if (!/^[a-z][a-z0-9]{3,15}$/g.test(username)) {
        result.isValidUsername = false;
      }
    }

    if (email) {
      if (!/\S+@\S+\.\S+/.test(email)) {
        result.isValidEmail = false;
      }
    }

    if (nickname) {
      if (!/^[가-힣a-zA-Z0-9]{2,10}$/g.test(nickname)) {
        result.isValidNickname = false;
      }
    }

    if (password) {
      if (password.length < 8) {
        result.isValidPassword = false;
      }
    }
    return result;
  },
  confliction: async ({ username, email, nickname }) => {
    // 들어온게 있다면 실행하도록
    const result = {
      isConflictUsername: true,
      isConflictEmail: true,
      isConflictNickname: true,
    };

    let isConflict;

    if (username) {
      isConflict = await users.findOne({ where: { username } });
      if (isConflict) {
        result.isConflictUsername = false;
      }
    }

    if (email) {
      isConflict = await users.findOne({ where: { email } });
      if (isConflict) {
        result.isConflictEmail = false;
      }
    }

    if (nickname) {
      isConflict = await users.findOne({ where: { nickname } });
      if (isConflict) {
        //! 데이터베이스가 대소문자 구분을 못함. 왜지!!!!
        result.isConflictNickname = false;
      }
    }
    return result;
  },
};
