const { User_account, Details, Games } = require('../models')
const fs = require('fs')
const { Op } = require('sequelize')
const { cloudinary } = require('../utils/cloudinary')

function base(file) {
  var bitmap = fs.readFileSync(file)
  var link = 'data:image/jpeg;base64,' + Buffer.from(bitmap).toString('base64')
  return link
}

module.exports = {
  register: async (req, res) => {
    const { username, email, password, imageLink, imageID } = req.body

    //Validate
    try {
      const user = await User_account.findOne({
        where: { email },
      })

      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      }
      if (!username || !email || !password) {
        return res.status(400).json({
          result: 'failed',
          message: 'Please missing credentials!',
        })
      }
      if (!validateEmail(email)) {
        return res.status(400).json({
          result: 'failed',
          message: 'Please enter valid email address',
        })
      }
      if (password.length < 6) {
        return res.status(400).json({
          result: 'failed',
          message: 'Please make your password bigger than 6 characters',
        })
      }
      
      if (user) {
        return res.status(400).json({
          result: 'failed',
          message: 'Email already existed',
        })
      }

      

      const imageDummy = base('public/dummy.png')

      const cloud = await cloudinary.uploader.upload(imageDummy, {
        folder: 'binarch11/avatar',
        width: '150',
        crop: 'scale',
      })

      await User_account.register({
        email,
        username,
        password,
        imageID: cloud.public_id,
        imageLink: cloud.secure_url,
      })
      res.status(201).json({
        message: 'Account has successfully registered!',
        data: {
          email,
          username,
        },
      })
    } catch (error) {
      return res.status(500).json({
        result: 'failed',
        message: error.message,
        error,
      })
    }
  },

  login: async (req, res) => {
    try {
      User_account.authenticate(req.body)
        .then((user) => {
          res.status(201).json({
            result: 'Login success',
            message: 'Login successfully',
            data: {
              id: user.id,
              email: user.email,
              accessToken: user.generateToken(),
            },
          })
        })
        .catch((error) => {
          res.status(400).json({
            result: 'Login failed!',
            message: 'Try entering the right credentials',
          })
        })
    } catch (error) {
      return res.status(500).json({
        result: 'Server failed!',
        error: error.message,
      })
    }
  },

  currentProfile: async (req, res) => {
    try {
      const currentUserInfo = await User_account.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        include: {
          model: Details,
          as: 'Details',
          include: {
            model: Games,
            as: 'Game',
          },
        },
      }).then((currentUserInfo) => {
      res.status(200).json({
        result: 'success',
        message: 'Here is your own info',
        data: currentUserInfo,
      })
    })
    //handling dengan tidak ada /me dengan tidak ada token
      // if (!currentUserInfo) {
      //   res.status(400).json({ result: 'failed token', message: 'please try re-login' })
      // }
      
    } catch (error) {
      return res.status(401).json({
        result: 'Server Failed',
        error: error.message,
      })
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { imageID, username, description, imageLink } = req.body
      const id = req.user.id
      console.log(imageID)

      let uploadedResponse = ''

      if (imageID) {
        const { resources } = await cloudinary.search.expression().sort_by('public_id').execute()
        const userImage = resources.filter((resource) => {
          return resource.public_id === imageID
        })

        //   // jika data image ada lakukan hapus
        if (userImage) {
          await cloudinary.uploader.destroy(imageID, () => {
            console.log('berhasil delete')
          })
        }

        uploadedResponse = await cloudinary.uploader.upload(imageLink, {
          folder: 'binarch11/avatar',
          width: '150',
          crop: 'scale',
        })
      }

      const user = await User_account.update(
        {
          username,
          description,
          imageLink: uploadedResponse?.secure_url,
          imageID: uploadedResponse?.public_id,
        },
        { where: { id } }
      )
      res.status(200).json({
        result: 'success',
        message: 'Info sucessfully updated',
      })
    } catch (error) {
      return res.status(500).json({
        result: 'Server failed',
        error: error.message,
      })
    }
  },

  showAllProfile: async (req, res) => {
    try {
      const users = await User_account.findAll({
        attributes: { exclude: ['password'] },
      })

      if (!users) {
        res.status(404).json({
          result: 'error',
          message: 'no user registered',
        })
      }
      return res.status(200).json({
        result: 'success',
        message: 'Showing all available user',
        data: users,
      })
    } catch (error) {
      return res.status(500).json({
        result: 'Server failed',
        error: error.message,
      })
    }
  },

  search: async (req, res) => {
    try {
      const { searchResult } = req.body
      User_account.findAll({
        where: {
          [Op.or]: [{ username: { [Op.iLike]: '%' + searchResult + '%' } }, { email: { [Op.iLike]: '%' + searchResult + '%' } }],
        },
        attributes: { exclude: ['password', 'asAdmin'] },
      }).then((results) => {
        res.status(200).json({
          result: 'success',
          message: 'showing all available data',
          results,
        })
      })
    } catch (error) {
      console.log(error)
    }
  },

  verify: async (req, res) => {
    User_account.verifyToken(req.headers.authorization)
      .then((result) => {
        console.log(result)
        res.status(200).json({
          result,
        })
      })
      .catch((error) => {
        res.status(400).json({
          error,
        })
      })
  },

  otherUser: async (req, res) => {
    try {
      const searchID = req.params.id
      const users = User_account.findOne({
        where: { id: searchID },
        attributes: { exclude: ['password', 'asAdmin'] },
        include: {
          model: Details,
          as: 'Details',
          include: {
            model: Games,
            as: 'Game',
          },
        },
      }).then((result) => {
        res.status(200).json({
          result: 'success',
          message: 'Successfully retrieved user',
          data: result,
        })
      })

      if (!users) {
        res.status(400).json({ result: 'failed', message: 'no user yet!' })
      }
    } catch (error) {
      return res.status(500).json({
        result: 'Server failed',
        error: error.message,
      })
    }
  },
}
