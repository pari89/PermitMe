const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try{
        console.log(req.body)
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({ msg: "Invalid Authentication."})
            // console.log("auth: ")
            // console.log(user.id)
            // console.log(user.iam)
            //console.log(user);
            req.user = user
            next()
        })
    }catch(err){
            return res.status(500).json({msg: err.message})
    }
}

module.exports = auth