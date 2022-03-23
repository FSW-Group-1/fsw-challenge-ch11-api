const fs = require('fs')
const {cloudinary} = require('./utils/cloudinary')

const data = 'data:image/jpeg;base64,'

function base(file){
    var bitmap = fs.readFileSync(file)
    return Buffer.from(bitmap).toString('base64')
}

try {
    var link  = base('./public/dummy.png')
    cloudinary.uploader.upload(`${data}${link}`, {
        folder: 'binarch11/avatar'
    })
    console.log('col')
} catch (error) {
    console.log(error)
}

