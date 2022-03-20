var express = require('express');
var router = express.Router();
const { User_account } = require('../models')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  res.redirect('/docs')
})

// === Test DB ===
  router.get('/test-accounts', async(req, res) => {
    try{
      const datas = await User_account.findAll()
      res.status(200).json({
        status: 200,
        msg: 'success',
        data: datas
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        msg: error
      })
    }
  })
// ===============

module.exports = router;
