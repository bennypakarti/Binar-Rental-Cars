const express = require("express");
const apiRouter = express.Router();
const path = require("path");
const multer = require("multer");
const controllers = require("../app/controllers");
const middlewares = require("../app/middlewares/authMiddleware");
const roleMiddleware = require("../app/middlewares/roleMiddleware");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocument = yaml.load("./openapi.yaml");

// Open API documentation
apiRouter.get(
  "/docs/swagger.json",
  controllers.api.v1.docsController.getSwagger
);
apiRouter.use("/api-docs", swaggerUi.serve);
apiRouter.get("/api-docs", swaggerUi.setup(swaggerDocument));
const app = express();

apiRouter.use(express.static(__dirname + "./app/public/"));
app.use(express.static("app/public/upload"));

// upload foto
global.__basedir = __dirname;

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./app/public/upload")); // set the destination
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // set the file name dynamically
  },
});
const uploadFile = multer({ storage: diskStorage });

// cek user
apiRouter.get("*", middlewares.checkUser);

// GET halaman
apiRouter.get("/", controllers.api.v1.authController.formLogin);
apiRouter.get("/registrasi", controllers.api.v1.authController.formRegis);
apiRouter.get("/cars", controllers.api.v1.authController.searchCar);
apiRouter.get("/home", controllers.api.v1.authController.main);
apiRouter.get(
  "/api/v1/dashboard-SuperAdmin",
  controllers.api.v1.authController.dashSuperAdmin
);

// get halaman form create car
apiRouter.get(
  "/api/v1/cars/form-create",
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.formAdd
);
apiRouter.get(
  "/api/v1/cars/form-update/:id",
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.formUpdate
);
apiRouter.get(
  "/api/v1/cars",
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.listCar
);
apiRouter.post(
  "/api/v1/cars/create",
  uploadFile.single("photo"),
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.createCar
);
apiRouter.post(
  "/api/v1/cars/update/:id",
  uploadFile.single("photo"),
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.updateCar
);
apiRouter.get(
  "/api/v1/cars/:id",
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.showCar
);
apiRouter.get(
  "/api/v1/cars/delete/:id",
  roleMiddleware.authorizeAdmin,
  controllers.api.v1.carController.destroyCar
);

// Authentication & Authorization
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);
apiRouter.post(
  "/api/v1/registerMember",
  controllers.api.v1.authController.registerMember
);
apiRouter.get(
  "/api/v1/form-registerAdmin",
  roleMiddleware.authorizeSuperAdmin,
  controllers.api.v1.authController.formRegisterAdmin
);
apiRouter.post(
  "/api/v1/registerAdmin",
  roleMiddleware.authorizeSuperAdmin,
  controllers.api.v1.authController.registerAdmin
);
apiRouter.get(
  "/api/v1/whoami",
  // middlewares.authorizeAdmin,
  controllers.api.v1.authController.whoAmI
);
apiRouter.get("/logout", controllers.api.v1.authController.logout);
app.get("/set-cookies", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("you got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);
});

//error handler
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
