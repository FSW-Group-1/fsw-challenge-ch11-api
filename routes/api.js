var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController');
const game = require('../controllers/gameController');
const authorize = require('../middlewares/authorize');
const restrict = require('../middlewares/restrict')

router.post('/register', api.register)
router.post('/login', api.login)

//Profile
router.get('/me', restrict, api.currentProfile) //Ini disatuin sama playedGame juga bisa
router.post('/me/update', restrict, api.updateProfile)

router.get('/all', api.showAllProfile)

//Ini method untuk update game
router.post('/score', restrict, game.updatePoints)
router.get('/played', restrict, game.playedGame)

//Profile list method
router.get('/users', game.allUser) //ini bisa dipake untuk gantiin '/all' + details
router.get('/user/:id', api.otherUser) //ini bisa dipake untuk gantiin '/all' + details

router.post('/search', api.search)

//Leaderboard and Game related
router.get('/allgame', game.getAllGame)
router.get('/leaderboard/:id', game.getLeaderboardGame)
router.get('/gamedetail/:id', game.getGameDetails)
router.post('/gamedetail/:id/update', game.updateGameDetails)
router.get('/verifytoken', restrict, api.verify)





module.exports = router;
