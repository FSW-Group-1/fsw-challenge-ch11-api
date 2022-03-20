const { User_account, Details, Games } = require('../models')
const { Op } = require('sequelize')

module.exports = {
    register: async (req, res) => {
        const { username, email, password} = req.body
        
        try {
            var user = await User_account.findOne({
                where: {
                    email
                }
            })

            if(user){
                // console.log('here')
                return res.status(400).json({
                    result: 'failed',
                    message: 'Email already existed'
                })
            }
        } catch (error) {
            return res.status(500).json({
                result: 'failed',
                error: error.message,
              });
        }

        try {
            await User_account.register(req.body)
            res.status(201).json({
                message: 'Account has successfully registered!',
                data: {
                  email,
                username,
                }
            })
                
        } catch (error) {
            return res.status(400).json({
                result: 'failed',
                message: error.message
            })
        }   
    },

    login: async(req, res) => {
        try {
            User_account
            .authenticate(req.body)
            .then(user => {
                res.status(201).json({
                    result: "Login success",
                    message: "Login successfully",
                    data: {
                        id: user.id, 
                        email: user.email, 
                        accessToken: user.generateToken()
                    },
                });
            })
            .catch(error => {
                res.status(400).json({
                    result: 'Login failed!',
                    message: 'Try entering the right credentials'
                })
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed!',
                error: error.message,
              });
        }
    },

    currentProfile: async (req, res) => {
        try {
            const currentUserInfo = await User_account.findOne({
                where: {id: req.user.id},
                attributes: {exclude: ['password']},
                include: {
                    model: Details,
                    as: 'Details',
                    include: {
                        model: Games,
                        as: 'Game'
                    }
                }
            })
            res.status(200).json({
                result: 'success',
                message: 'Here is your own info',
                data: currentUserInfo
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { username, description, imageLink } = req.body;
            const id = req.user.id;

            if(!id){
                return res.status(400).json({
                    result: 'error',
                    message: 'ID not found'
                })
            }
            
            const user = await User_account.update({
                username,
                description, 
                imageLink
            },
            {where: {id}})
            res.status(200).json({
                result: 'success',
                message: 'Info sucessfully updated',
                updatedInfo: {
                    username,
                    description,
                    imageLink
                }
            })

        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    showAllProfile: async(req, res) =>{
        try {
            const users = await User_account.findAll({
                attributes: {exclude: ['password']}
            });

            if (!users) {
                res.status(404).json({
                  result: 'error',
                  message: 'no user registered',
                });
              }
            return res.status(200).json({
                result: 'sucess',
                message: 'Showing all available user',
                data: users
            })
        } catch (error) {
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    },

    search: async(req, res) => {
        try{
            const {searchResult} = req.body;
            User_account.findAll({
                where: { 
                    [Op.or]: [
                        {username: { [Op.iLike]: '%' + searchResult + '%'} },
                        {email: { [Op.iLike]: '%' + searchResult + '%'} },
                    ]
                },
                attributes: {exclude: ['password', 'asAdmin']}
            })
            .then(results => {
                res.status(200).json({
                    result: 'success',
                    message: 'showing all available data',
                    results
                })
            })
                
        }catch(error) {
            console.log(error)
        }
    },

    verify: async (req, res)  => {
        User_account.verifyToken(req.headers.authorization)
                    .then(result => {
                        console.log(result)
                        res.status(200).json({
                            result
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            error
                        })
                    })
    },

    otherUser: async(req, res) => {
        try {
            const searchID = req.params.id;
            const users = User_account.findOne({
                where: {id: searchID},
                attributes: {exclude: ['password', 'asAdmin']},
                include: {
                    model: Details,
                    as: 'Details',
                    include: {
                        model: Games,
                        as: 'Game'
                    }
                }
            }).then(result => {
                res.status(200).json({
                    result: 'success',
                    message: 'Successfully retrieved user',
                    data: result
                })
            })

            if(!users){
                res.status(400).json({result: 'failed', message: 'no user yet!'})
            }
            
        }catch(error){
            return res.status(500).json({
                result: 'Server failed',
                error: error.message,
              });
        }
    }
}

