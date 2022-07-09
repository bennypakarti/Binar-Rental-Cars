const carService = require("../../../services/carService");
const ukurService = require("../../../services/ukurService");
const { readFile } = require("fs").promises;
const activityService = require("../../../services/activityService");

module.exports = {
  async formAdd(req, res) {
    res.send(await readFile("./app/views/addcar.ejs", "utf8"));
  },

  async formUpdate(req, res) {
    const cars = await carService.get(req.params.id);
    const coba = await ukurService.list();
    res.render("edit", { cars, coba });
  },

  async listCar(req, res) {
    carService
      .list()
      .then(({ cars }) => {
        res.render("./index", { cars });
      })
      .catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  createCar(req, res) {
    carService
      .create({
        size_id: req.body.size_id,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        photo: req.file.filename,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        type: req.body.type,
        year: req.body.year,
        options: req.body.options,
        specs: req.body.specs,
        availableAt: req.body.availableAt,
      })
      .then((Car) => {
        res.redirect("/api/v1/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async updateCar(req, res) {
    carService
      .update(req.params.id, {
        size_id: req.body.size_id,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        photo: req.file.filename,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        type: req.body.type,
        year: req.body.year,
        options: req.body.options,
        specs: req.body.specs,
        availableAt: req.body.availableAt,
      })
      .then(() => {
        res.redirect("/api/v1/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },

  async showCar(req, res) {
    if (req.User.id_type === 1 || req.User.id_type === 2) {
      carService
        .get(req.params.id)
        .then((Car) => {
          res.status(200).json({
            status: "OK",
            data: Car,
          });
        })
        .catch((err) => {
          res.status(422).json({
            status: "FAIL",
            message: err.message,
          });
        });
    } else {
      res.status(403).json({
        status: "FAIL",
        message: "You are not authorized to perform this action",
      });
    }
  },

  async destroyCar(req, res) {
    carService
      .delete(req.params.id)
      .then((Car) => {
        res.redirect("/api/v1/cars");
      })
      .catch((err) => {
        res.status(422).json({
          status: "FAIL",
          message: err.message,
        });
      });
  },
};
