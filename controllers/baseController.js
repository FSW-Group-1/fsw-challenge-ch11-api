module.exports = {
    me: (req, res) => {
        res.status(200).json({
            status: true,
            message: "Hello World!"
        })
    },
    all: (req, res) => {
        res.status(200).json({
            status: true,
            message: 'Parameters summarized!',
            data: {
                x: req.body.x,
                y: req.body.y,
                result: req.body.x + req.body.y
            }
        })
    },
    user: (req, res) => {
        res.status(200).json({
            status: true,
            message: "Hello World!"
        })
    },
    verifyToken: (req, res) => {
        res.status(200).json({
            status: true,
            message: "Hello World!"
        })
    },
}