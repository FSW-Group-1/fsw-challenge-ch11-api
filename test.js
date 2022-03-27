const fs = require('fs')
const {cloudinary} = require('./utils/cloudinary')

const data = 'data:image/jpeg;base64,'

function base(file){
    var bitmap = fs.readFileSync(file)
    var link = 'data:image/jpeg;base64,' + Buffer.from(bitmap).toString('base64')
    return link
}

try {
    var test = async() => {
        const cloud = await cloudinary.uploader.upload(base('./public/dummy.png'),{
            folder: 'binarch11/avatar',
            width: '150',
            crop: 'scale',
        })
        console.log(cloud.public_id)
        console.log(cloud.secure_url)
        // const res = cloudinary.uploader.upload(`${data}${link}`, {
        //     folder: 'binarch11/avatar'
        // })
    }
    test()
    

} catch (error) {
    console.log(error)
}



