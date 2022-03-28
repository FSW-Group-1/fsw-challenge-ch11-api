var express = require('express');
var router = express.Router();
const api = require('../controllers/apiController');
const game = require('../controllers/gameController');
const authorize = require('../middlewares/authorize');
const restrict = require('../middlewares/restrict')

router.post('/register', api.register)
router.post('/login', api.login)

//Profile
//Test Unit fauzan 1 Current Profile → cara kerjanya lewat /me. 
//Ngambil informasi kalo misalkan ada jwt. Kalo gk ada muncul "Unauthorized"
router.get('/me', restrict, api.currentProfile) //Ini disatuin sama playedGame juga bisa 

router.post('/me/update', restrict, api.updateProfile)

//Test Unit fauzan 2 Show All Profile → unit test cari kasus show all profile
router.get('/all', api.showAllProfile)

//Ini method untuk update game
router.post('/score', restrict, game.updatePoints)
router.get('/played', restrict, game.playedGame)

//Profile list method
router.get('/users', game.allUser) //ini bisa dipake untuk gantiin '/all' + details

//Test Unit fauzan. other user 
router.get('/user/:id', api.otherUser) //ini bisa dipake untuk gantiin '/all' + details
router.post('/search', api.search)

//Leaderboard and Game related
router.get('/allgame', game.getAllGame)
router.get('/leaderboard/:id', game.getLeaderboardGame)
router.get('/gamedetail/:id', game.getGameDetails)
router.post('/gamedetail/:id/update', game.updateGameDetails)

//Test Unit fauzan 3 verify → unit test jwt token yang ada di authorization header.
// cara kerja di postman: simpan jwt di authorization header → request → bakal muncul error atau tidak
router.get('/verifytoken', restrict, api.verify)





module.exports = router;
