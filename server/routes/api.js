const express = require("express");

const registerController = require('../controllers/register');
const loginController = require('../controllers/login')
const gameControllers = require('../controllers/game');

const requireAuth = require('../middleware/auth');

const router = express.Router();

// authentication
router.post("/auth/register", registerController);
router.post("/auth/login", loginController);

// user
router.get("/player/info", requireAuth, gameControllers.getUserInfo)

// leaderboard
router.get("/player/leaderboard", requireAuth, gameControllers.leaderboard)

router.post("/room/random", requireAuth, gameControllers.random);

// connect with a player (create a room)
router.post('/room/create', requireAuth, gameControllers.connect)

// delete room
router.post('/room/delete', requireAuth, gameControllers.delRoom);

// list rooms of player
router.get('/room/list', requireAuth, gameControllers.listRooms)

// list chat
router.get('/chat/list', requireAuth, gameControllers.listChat)

// send message
router.post('/chat/put', requireAuth, gameControllers.sendMessage)

// get match
router.get('/match/get', requireAuth, gameControllers.getMatchC)

// list match
router.get('/match/list', requireAuth, gameControllers.listMatchesC)

module.exports = router;
