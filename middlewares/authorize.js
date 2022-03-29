const {User_account} = require('../models')

module.exports = async (req, res, next) =>{
    try {
        // const id = req.user.id;
        // console.log(req.user.asAdmin)
        if(req.user.asAdmin === true){
            return next();
        }
        return res.status(400).json({
            result: 'failed',
            message: 'You are not authorized!'
        })
    } catch (error) {
        res.status(400).json({
            result: 'failed',
            error
        })
    }
}