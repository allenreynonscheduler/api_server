const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const LeaguesController = require("../controllers/LeaguesController");
const SeasonControllers = require("../controllers/SeasonControllers");


router.get("/testapi", UserController.testapi);
router.post("/register", UserController.register);
router.post("/login", UserController.login);


router.route("/leagues")
  .get(LeaguesController.index)
  .post(LeaguesController.store);

router.route("/leagues/:id")
  .get(LeaguesController.show)
  .put(LeaguesController.update)
  .delete(LeaguesController.destroy);

router.route("/seasons")
  .get(SeasonControllers.index)
  .post(SeasonControllers.store);

router.route("/seasons/:id")
  .get(SeasonControllers.show)
  .put(SeasonControllers.update)
  .delete(SeasonControllers.destroy);

module.exports = router;
