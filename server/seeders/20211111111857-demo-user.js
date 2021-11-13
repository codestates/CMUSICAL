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
    return queryInterface.bulkInsert('items', [
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
    return queryInterface.bulkDelete('items', null, {});
  },
};
