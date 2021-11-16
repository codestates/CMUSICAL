'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userId1 = await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 2,
          username: 'elsa',
          nickname: 'oalf',
          password: '12345678',
          email: 'elsfsaa@frozen.com',
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
      ],
      { returning: ['id'] }
    );
    const userId2 = await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 3,
          username: 'kimcoding',
          nickname: '김코딩',
          password: '12345678',
          email: 'test@example.com',
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
      ],
      { returning: ['id'] }
    );
    const userId3 = await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 4,
          username: 'parkhacker',
          nickname: '박해커',
          password: '12345678',
          email: 'test2@example.com',
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
      ],
      { returning: ['id'] }
    );
    const itemId = await queryInterface.bulkInsert(
      'items',
      [
        {
          id: 1,
          title: '트루먼쇼',
          thumbnail: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
          theater: '대학로 스카이씨어터',
          price: '30,000원',
          cast: '서은유',
          runtime: '2시간',
          showtime: '금(18:00)',
          dateFrom: '2021.11.01',
          dateTo: '2021.11.30',
          state: '공연중',
          poster: null,
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
        {
          id: 2,
          title: '국립국악원과 함께하는 창덕궁 풍류',
          thumbnail: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182728_211109_150050.jpg',
          theater: '창덕궁',
          price: '10,000원',
          cast: '박진혁, 김연진',
          runtime: '1시간 30분',
          showtime: '목,금(18:00)',
          dateFrom: '2021.10.01',
          dateTo: '2021.10.31',
          state: '공연완료',
          poster: { styurl: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182728_211109_150050.jpg' },
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
        {
          id: 3,
          title: '트루먼쇼2',
          thumbnail: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
          theater: '대학로 스카이씨어터',
          price: '30,000원',
          cast: '이승훈',
          runtime: '2시간',
          showtime: '수(17:00)',
          dateFrom: '2021.12.01',
          dateTo: '2021.12.31',
          state: '공연예정',
          poster: {
            styurl: [
              'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
              'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
              'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
              'http://www.kopis.or.kr/upload/pfmPoster/PF_PF182726_211109_141812.gif',
            ],
          },
          createdAt: '2021-11-13 10:57:35',
          updatedAt: '2021-11-14 10:57:35',
        },
      ],
      { returning: ['id'] }
    );
    await queryInterface.bulkInsert('comments', [
      {
        id: 1,
        comment: 'This musical is awesome!',
        nickname: 'oalf',
        userId: userId1,
        itemId: itemId,
        createdAt: '2021-11-13 10:57:35',
        updatedAt: '2021-11-14 10:57:35',
      },
      {
        id: 2,
        comment: '저는 좀 별로였어요 ㅜ',
        nickname: '김코딩',
        userId: userId2,
        itemId: itemId,
        createdAt: '2021-11-13 10:57:35',
        updatedAt: '2021-11-14 10:57:35',
      },
      {
        id: 3,
        comment: '그럭저럭이였어요',
        nickname: '박해커',
        userId: userId3,
        itemId: itemId,
        createdAt: '2021-11-13 10:57:35',
        updatedAt: '2021-11-14 10:57:35',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('items', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  },
};
