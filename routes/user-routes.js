const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const LeaguesController = require("../controllers/LeaguesController");
const SeasonControllers = require("../controllers/SeasonControllers");
const DivisionsControllers = require("../controllers/DivisionsController");
const ConferenceControllers = require("../controllers/ConferenceController");
const ArenaControllers = require("../controllers/ArenaController");
const TeamControllers = require("../controllers/TeamController");


router.get("/testapi", UserController.testapi);
router.post("/register", UserController.register);
router.post("/login", UserController.login);


router.route("/leagues")
  .get(LeaguesController.index)
  .post(LeaguesController.store);
  
router.route("/leagueslist")
  .get(LeaguesController.leaguelist);
  

router.route("/leagues/:id")
  .get(LeaguesController.show)
  .put(LeaguesController.update)
  .delete(LeaguesController.destroy);

router.route("/seasons")
  .get(SeasonControllers.index)
  .post(SeasonControllers.store);

router.route("/seasonlist")
  .get(SeasonControllers.seasonlist);
  

router.route("/seasons/:id")
  .get(SeasonControllers.show)
  .put(SeasonControllers.update)
  .delete(SeasonControllers.destroy);

router.route("/divisions")
  .get(DivisionsControllers.index)
  .post(DivisionsControllers.store);

router.route("/divisionlist")
  .get(DivisionsControllers.divisionlist);
  


router.route("/divisions/:id")
  .get(DivisionsControllers.show)
  .put(DivisionsControllers.update)
  .delete(DivisionsControllers.destroy);


router.route("/conference")
  .get(ConferenceControllers.index)
  .post(ConferenceControllers.store);

router.route("/conferencelist")
  .get(ConferenceControllers.conferencelist);
  

router.route("/conference/:id")
  .get(ConferenceControllers.show)
  .put(ConferenceControllers.update)
  .delete(ConferenceControllers.destroy);
  
router.route("/arena")
  .get(ArenaControllers.index)
  .post(ArenaControllers.store);

router.route("/arena/:id")
  .get(ArenaControllers.show)
  .put(ArenaControllers.update)
  .delete(ArenaControllers.destroy);

router.route("/team")
  .get(TeamControllers.index)
  .post(TeamControllers.store);

router.route("/team/:id")
  .get(TeamControllers.show)
  .put(TeamControllers.update)
  .delete(TeamControllers.destroy);

module.exports = router;
