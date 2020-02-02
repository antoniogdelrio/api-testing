const User = require('../models/user');

exports.get_users = (req,res,next) => {
    User.find()
        .exec()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
}

exports.post_user = (req,res,next)=>{
    const user = new User({
       userName: req.body.userName,
       _id: mongoose.Types.ObjectId() 
    })

    user.save()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        })
}