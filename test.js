const fs = require('fs')
const {cloudinary} = require('./utils/cloudinary')

const data = 'data:image/jpeg;base64,'

function base(file){
    var bitmap = fs.readFileSync(file)
    return Buffer.from(bitmap).toString('base64')
}

try {
    var test = async() => {
        var link  = base('./public/dummy.png')
        console.log(link)
        const cloud = await cloudinary.uploader.upload(`${data}${link}`,{
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



