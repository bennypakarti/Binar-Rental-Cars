"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = [
      {
        size_id: 1,
        plate: "DBH-3491",
        manufacture: "Ford",
        model: "F150",
        photo: "photo-1652787028001.jpg",
        rentPerDay: 300000,
        capacity: 2,
        description:
          " Brake assist, Leather-wrapped shift knob, Glove box lamp, Air conditioning w/in-cabin microfilter",
        transmission: "Automatic",
        type: "Sedan",
        year: "2022",
        options: "Cruise Control, Tinted Glass",
        specs: "Brake assist, Leather-wrapped shift knob, Glove box lamp",
        availableAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        size_id: 3,
        plate: "OSL-4224",
        manufacture: "Toyota",
        model: "Malibu",
        photo: "photo-1652787042207.jpg",
        rentPerDay: 900000,
        capacity: 6,
        description:
          " Leather-wrapped shift knob. Dual front illuminated visor vanity mirrors. Battery saver. Driver & front passenger map pockets.",
        transmission: "CVT",
        type: "SUV",
        year: "2017",
        options: "Memory Seats, Cassette Player",
        specs: "Leather-wrapped shift knob",
        availableAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Cars", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
