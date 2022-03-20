const { User_account, Details, Games } = require('../models')

module.exports = {
    updatePoints: async(req, res) =>{
        try {
            let userDetail = await Details.findOne({
                attributes: ['point'],
                where: {
                    gameID: req.body.gameID, userID: req.user.id
                }
            });

            let user = await User_account.findOne({
                attributes: ['point'],
                where: {
                    id: req.user.id
                }  
            })
            if(!userDetail){
                // console.log('IF NOT EXIST RUN HERE')
                Details.create({
                    gameID: req.body.gameID,
                    userID: req.user.id,
                    point: req.body.point
                })
                .then(User_account.update({ point: parseInt(req.body.point) + user.point}, {where: {id: req.user.id}}))

                res.status(200)
                .json({
                        result: 'sucess',
                        message: 'point created',})
            }
            else{
                Details.update({
                    point: parseInt(req.body.point) + userDetail.point
                },
                {
                    where: {
                        userID: req.user.id,
                        gameID: req.body.gameID
                    }
                })
                .then(User_account.update({ point: parseInt(req.body.point) + user.point}, {where: {id: req.user.id}}))
    
                res.status(200)
                .json({
                        result: 'success',
                        message: 'point updated!',})
            }
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    playedGame: async (req, res) =>{
        try {
            Details.findAll({
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt'],
                },
                where: {
                    userID: req.user.id
                }
            })
            .then( data =>{
                res.status(200).json({
                    result: 'success',
                    message: 'Here is the necessary data',
                    data
                })
            })
            .catch(error => {
                res.status(400).json({
                    result: 'failed',
                    message: 'Failed to retreive data',
                    error: error.message
                })
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
        
    },

    allUser: async (req, res) =>{
        try {
            const users = await User_account.findAll({
                attributes: {exclude: ['password', 'asAdmin']},
                include: {
                    model: Details,
                    as: 'Details',
                }
            });
            if(!users){
                res.status(400).json({result: 'failed', message: 'no user yet!'})
            }

            res.status(200).json({
                result: 'success',
                message: 'Successfully retrieved all user',
                data: users
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    getLeaderboardGame: async (req, res) => {
        try {
            console.log(req.params.id)
            Details.findAll({
                where:{
                    gameID: req.params.id, // tentuin nya nnti liat berdasarkan parameter atau bukan 
                },
                attributes: ['gameID', 'userID', 'point'],
                include: {
                    model: User_account,
                    as: 'User_account',
                    attributes: {exclude: ['password', 'asAdmin']}
                }
            })
            .then(data => {
                res.status(200).json({
                    result: 'success',
                    message: 'Here is all the data for leaderboard',
                    data 
                })
            })
            .catch(error =>{
                res.status(400).json({
                    result: 'failed',
                    message: 'some error occured',
                    error
                })
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },
    
    getGameDetails: async(req, res) => {
        try {
            const id = req.params.id;
            await Games.findOne({where: {id}}).then(game => {
                res.status(200).json({
                    result: 'success',
                    message: 'Game with certain id',
                    data: game
                })
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    updateGameDetails: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, description, imageLink, gameLink} = req.body;
            await Games.update({
                name, description, imageLink, gameLink
            }, {where: {id}})
            .then(res.status(200).json({
                result: 'success',
                message: 'info has been updated',
                })
            )
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    getAllGame: async(req, res) => {
        try {
            await Games.findAll().then(game => {
                res.status(200).json({
                    result: 'success',
                    message: 'Here is all the game',
                    data: game
                })
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    }


}