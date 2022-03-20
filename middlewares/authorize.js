const {User_account} = require('../models')

module.exports = async (req, res, next) =>{
    try {
        const id = req.user.id;
        console.log(req.user.isAdmin)
        const User = await User_account.findOne({where: { id }})
        if(User.id === req.user.id){
            return next();
        }
        return res.status(400).json({
            result: 'failed',
            message: 'You need to log in to enter here'
        })
    } catch (error) {
        res.status(400).json({
            result: 'failed',
            error
        })
    }
}